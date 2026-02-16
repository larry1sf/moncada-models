"use client"
import { GenderOptions, Producto, responseMetaApi } from "@/types/typos"
import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react"

type FetchProductosParams = {
    page?: number;
    itemsPerPage?: number;
    gender?: string;
    clothingType?: string;
    sort?: string;
    slugCategory?: string;
    search?: string;
}

type ProductosState = {
    data: Producto[];
    meta: responseMetaApi["pagination"] | null;
}

interface ProductosContextType {
    productos: ProductosState;
    loading: boolean;
    error: boolean;
    filters: {
        gender: string;
        clothingType: string;
        sort: string;
        slugCategory: string;
        search: string;
    }
    fetchProductos: (params?: FetchProductosParams) => Promise<void>;
    setFilters: (filters: Partial<ProductosContextType["filters"]>) => void;
    setProductos: (productos: ProductosState) => void;
    resetFilters: () => void;
    clothingTypeOptions: GenderOptions;
    genderOptions: GenderOptions;
}

const ProductosContext = createContext<ProductosContextType | null>(null);

export const useProductosContext = () => {
    const context = useContext(ProductosContext);
    if (!context) {
        throw new Error("useProductosContext must be used within a ProductosProvider");
    }
    return context;
};

export default function ProductosProvider({ children, initialData, initialMeta }: {
    children: React.ReactNode,
    initialData?: Producto[],
    initialMeta?: responseMetaApi["pagination"]
}) {

    const [productos, setProductos] = useState<ProductosState>({
        data: initialData ?? [],
        meta: initialMeta ?? null
    })

    const [loading, setLoading] = useState(!!initialData)
    const [error, setError] = useState(false)
    const [hasFetched, setHasFetched] = useState(!!initialData);

    const [filters, setFiltersState] = useState({
        gender: "all",
        clothingType: "all",
        sort: "createdAt:desc",
        slugCategory: "all",
        search: ""
    })

    const setFilters = (newFilters: Partial<typeof filters>) =>
        setFiltersState(prev => ({ ...prev, ...newFilters }))

    const resetFilters = () => {
        setFiltersState({
            gender: "all",
            clothingType: "all",
            sort: "createdAt:desc",
            slugCategory: "all",
            search: ""
        })
    }

    const cache = useRef<Map<string, { data: Producto[], meta: responseMetaApi["pagination"] | null }>>(new Map());

    const fetchProductos = useCallback(async (params?: FetchProductosParams) => {

        if (hasFetched && !params?.clothingType && !params?.slugCategory && !params?.search && !params?.gender && !params?.sort && !params?.page && !params?.itemsPerPage) return

        const currentFilters = { ...filters, ...params } // si ahi uno igual lo sobreescribe
        const requestBody = {
            page: params?.page ?? 1,
            itemsPerPage: params?.itemsPerPage ?? 6,
            slugCategory: currentFilters.slugCategory === "all" ? undefined : currentFilters.slugCategory,
            gender: currentFilters.gender === "all" ? undefined : currentFilters.gender,
            clothingType: currentFilters.clothingType === "all" ? undefined : currentFilters.clothingType,
            sort: currentFilters.sort,
            search: currentFilters.search
        }

        const cacheKey = JSON.stringify(requestBody)
        if (cache.current.has(cacheKey)) {
            const cachedData = cache.current.get(cacheKey)
            if (cachedData) {
                setProductos(cachedData)
                setHasFetched(true)
                setLoading(false)
                setError(false)
                return
            }
        }

        try {
            setLoading(true)

            const res = await fetch("/api/productos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            })

            const { data, meta: resMeta } = (await res.json()) as { data: Producto[], meta: responseMetaApi }
            if (Array.isArray(data) && data.length) {
                setProductos({
                    data,
                    meta: resMeta?.pagination || null
                })
                setHasFetched(true)
                cache.current.set(cacheKey, {
                    data,
                    meta: resMeta?.pagination || null
                })
                setError(false)
                return
            }

            console.warn("Error fetching products:", error)
            setError(true)
            setProductos({
                data: [],
                meta: null
            })
        } catch (error) {
            console.error("Error loading products:", error)
            setError(true)
            setProductos({
                data: [],
                meta: null
            })
        } finally {
            setLoading(false)
        }
    }, [filters])

    // estado para guardar las opciones de genero
    const [genderOptions, setGenderOptions] = useState<GenderOptions>([
        { value: "all", label: "Todos" }
    ])

    // llamar al servicio que me da las opciones de genero
    useEffect(() => {
        fetch('api/generos')
            .then(res => res.json() as Promise<{ genderOptions: GenderOptions }>)
            .then(({ genderOptions }) => {
                setGenderOptions(prevGenders => [
                    ...prevGenders,
                    ...genderOptions.filter(item =>
                        !prevGenders.some(gender => gender.value === item.value)
                    )
                ])
            })
    }, [])

    // estado para guardar las opciones de tipo de ropa
    const [clothingTypeOptions, setClothingTypeOptions] = useState<GenderOptions>([
        { value: "all", label: "Todos" }
    ])

    // llamar al servicio que me da las opciones de tipo de ropa
    useEffect(() => {
        fetch('api/tipos-ropa')
            .then(res => res.json() as Promise<{ clothingTypeOptions: GenderOptions }>)
            .then(({ clothingTypeOptions }) => {
                setClothingTypeOptions(prevClothingTypes => [
                    ...prevClothingTypes,
                    ...clothingTypeOptions.filter(item =>
                        !prevClothingTypes.some(clothingType => clothingType.value === item.value)
                    )
                ])
            })
    }, [])


    return (
        <ProductosContext value={{
            productos,
            loading,
            error,
            filters,
            genderOptions,
            clothingTypeOptions,
            fetchProductos,
            setFilters,
            setProductos,
            resetFilters
        }}>
            {children}
        </ProductosContext>
    )
}

