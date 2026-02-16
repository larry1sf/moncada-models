"use client"
import { CategoryHeader, GenderOptions, Producto, responseMetaApi } from "@/types/typos"
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
    // Todos los productos cargados inicialmente
    allProducts: Producto[];
    // Productos filtrados/paginados para mostrar
    productos: ProductosState;
    loading: boolean;
    isLoadingC: boolean;
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
    // Metadata extraída de todos los productos
    categoriasHeaders: CategoryHeader[];
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

// Función para extraer metadata de los productos
function extractMetadata(products: Producto[]) {
    // Extraer categorías header
    const headersCategories = products.map(product => ({
        id: product.id,
        image: product.images?.at(1),
        title: product.product_category.title,
        slug: product.product_category.slug,
        productCount: 1
    }));

    const categoryMap = headersCategories.reduce<Record<string, CategoryHeader>>((acc, { title, slug, id, image }) => {
        acc[slug] = acc[slug] || { title, slug, productCount: 0, id, image };
        acc[slug].productCount += 1;
        return acc;
    }, {});

    const categoriasHeaders = Object.values(categoryMap);

    // Extraer géneros únicos
    const uniqueGenders = [...new Set(products.map(p => p.gender).filter(Boolean))];
    const genderOptions: GenderOptions = [
        { value: "all", label: "Todos" },
        ...uniqueGenders.map(gender => ({
            value: gender,
            label: gender.charAt(0).toUpperCase() + gender.slice(1)
        }))
    ];

    // Extraer tipos de ropa únicos
    const uniqueClothingTypes = [...new Set(products.map(p => p.clothing_type).filter(Boolean))];
    const clothingTypeOptions: GenderOptions = [
        { value: "all", label: "Todos" },
        ...uniqueClothingTypes.map(type => ({
            value: type,
            label: type.charAt(0).toUpperCase() + type.slice(1)
        }))
    ];

    return { categoriasHeaders, genderOptions, clothingTypeOptions };
}

export default function ProductosProvider({ children, initialData, initialMeta }: {
    children: React.ReactNode,
    initialData?: Producto[],
    initialMeta?: responseMetaApi["pagination"]
}) {
    // Guardar todos los productos cargados inicialmente
    const [allProducts] = useState<Producto[]>(initialData ?? []);
    
    // Extraer metadata de los productos iniciales (solo una vez)
    const [categoriasHeaders, setCategoriasHeaders] = useState<CategoryHeader[]>([]);
    const [genderOptions, setGenderOptions] = useState<GenderOptions>([{ value: "all", label: "Todos" }]);
    const [clothingTypeOptions, setClothingTypeOptions] = useState<GenderOptions>([{ value: "all", label: "Todos" }]);
    const [isLoadingC, setIsLoadingC] = useState(true);

    // Estado para productos filtrados/paginados
    const [productos, setProductos] = useState<ProductosState>({
        data: initialData ?? [],
        meta: initialMeta ?? null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const [filters, setFiltersState] = useState({
        gender: "all",
        clothingType: "all",
        sort: "createdAt:desc",
        slugCategory: "all",
        search: ""
    });

    // Extraer metadata cuando cambian los productos iniciales
    useEffect(() => {
        if (allProducts.length > 0) {
            setIsLoadingC(true);
            const metadata = extractMetadata(allProducts);
            setCategoriasHeaders(metadata.categoriasHeaders);
            setGenderOptions(metadata.genderOptions);
            setClothingTypeOptions(metadata.clothingTypeOptions);
            setIsLoadingC(false);
        }
    }, [allProducts]);

    const setFilters = (newFilters: Partial<typeof filters>) =>
        setFiltersState(prev => ({ ...prev, ...newFilters }));

    const resetFilters = () => {
        setFiltersState({
            gender: "all",
            clothingType: "all",
            sort: "createdAt:desc",
            slugCategory: "all",
            search: ""
        });
    };

    const cache = useRef<Map<string, { data: Producto[], meta: responseMetaApi["pagination"] | null }>>(new Map());

    const fetchProductos = useCallback(async (params?: FetchProductosParams) => {
        // Si no hay parámetros y ya tenemos datos, no hacer nada
        if (hasFetched && !params?.clothingType && !params?.slugCategory && !params?.search && !params?.gender && !params?.sort && !params?.page && !params?.itemsPerPage) {
            return;
        }

        const currentFilters = { ...filters, ...params };
        const requestBody = {
            page: params?.page ?? 1,
            itemsPerPage: params?.itemsPerPage ?? 6,
            slugCategory: currentFilters.slugCategory === "all" ? undefined : currentFilters.slugCategory,
            gender: currentFilters.gender === "all" ? undefined : currentFilters.gender,
            clothingType: currentFilters.clothingType === "all" ? undefined : currentFilters.clothingType,
            sort: currentFilters.sort,
            search: currentFilters.search
        };

        const cacheKey = JSON.stringify(requestBody);
        if (cache.current.has(cacheKey)) {
            const cachedData = cache.current.get(cacheKey);
            if (cachedData) {
                setProductos(cachedData);
                setHasFetched(true);
                setLoading(false);
                setError(false);
                return;
            }
        }

        try {
            setLoading(true);

            const res = await fetch("/api/productos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const { data, meta: resMeta } = (await res.json()) as { data: Producto[], meta: responseMetaApi };
            
            if (Array.isArray(data)) {
                const newProducts = {
                    data,
                    meta: resMeta?.pagination || null
                };
                setProductos(newProducts);
                setHasFetched(true);
                cache.current.set(cacheKey, newProducts);
                setError(false);
            } else {
                setError(true);
                setProductos({
                    data: [],
                    meta: null
                });
            }
        } catch (err) {
            console.error("Error loading products:", err);
            setError(true);
            setProductos({
                data: [],
                meta: null
            });
        } finally {
            setLoading(false);
        }
    }, [filters, hasFetched]);

    return (
        <ProductosContext value={{
            allProducts,
            isLoadingC,
            categoriasHeaders,
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
    );
}
