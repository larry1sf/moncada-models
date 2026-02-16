"use client";

import { ProductCategory, responseMetaApi, TSortOption } from "@/types/typos";
import { SORT_OPTIONS } from "@/lib/const";
import { createContext, useContext, useState, ReactNode, useRef } from "react";

interface PropsFetch {
  page?: number;
  pageSize?: number;
  onlyProductCount?: boolean;
  searchQuery?: string;
  sortBy?: TSortOption;
}

interface CategoriasContextValue {
  categories: ProductCategory[] | null;
  metaCategories: responseMetaApi["pagination"] | null;
  isLoading: boolean;
  error: boolean;
  searchQuery: string;
  sortBy: TSortOption;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: TSortOption) => void;
  setCategories: (categories: ProductCategory[] | null) => void;
  setMetaCategories: (meta: responseMetaApi["pagination"] | null) => void;
  fetchCategorias: (params?: PropsFetch) => Promise<void>;
  handleResetFilters: () => void;
}

export const CategoriasContext = createContext<
  CategoriasContextValue | undefined
>(undefined);

export function useCategorias() {
  const context = useContext(CategoriasContext);
  if (context === undefined)
    throw new Error(
      "useCategorias debe usarse dentro de un CategoriasContextProvider",
    );

  return context;
}

export default function CategoriasContextProvider({
  children,
  initialData = null,
  initialMeta = null,
}: {
  children: ReactNode;
  initialData?: ProductCategory[] | null;
  initialMeta?: responseMetaApi["pagination"] | null;
}) {
  const [categories, setCategories] = useState<ProductCategory[] | null>(initialData);
  const [metaCategories, setMetaCategories] = useState<
    responseMetaApi["pagination"] | null
  >(initialMeta);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<TSortOption>(SORT_OPTIONS.NOMBRE_ASC);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState(false);
  const [hasFetched, setHasFetched] = useState(!!initialData);

  const cache = useRef<Map<string, { data: ProductCategory[], meta: responseMetaApi["pagination"] | null }>>(new Map());

  const fetchCategorias = async (params?: PropsFetch) => {
    // Si ya se hizo un fetch inicial y no se pasan parámetros específicos (como búsqueda o paginación), retornamos
    if (hasFetched && !params?.searchQuery && !params?.sortBy && !params?.page)
      return;

    const currentSort = params?.sortBy ?? sortBy;
    const requestBody = {
      page: params?.page ?? 1,
      itemsPerPage: params?.pageSize ?? 6,
      onlyProductCount: params?.onlyProductCount ?? false,
      whitProducts: true,
      searchQuery: params?.searchQuery ?? searchQuery,
      sortBy: currentSort,
    };

    const cacheKey = JSON.stringify(requestBody);

    if (cache.current.has(cacheKey)) {
      const cachedData = cache.current.get(cacheKey);
      if (cachedData) {
        setCategories(cachedData.data);
        setMetaCategories(cachedData.meta);
        // Marcamos como fetch inicial realizado si usamos cache
        setHasFetched(true);
        setIsLoading(false);
        return;
      }
    }

    setIsLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const { data, meta } = await res.json();

      if (data) {
        // Aplicar ordenamiento por cantidad de productos si es necesario (ya que Strapi a veces no lo maneja bien en la relación)
        let sortedData = [...data];

        if (currentSort === "products-desc") {
          sortedData.sort((a, b) => {
            const countA = Array.isArray(a.products) ? a.products.length : 0;
            const countB = Array.isArray(b.products) ? b.products.length : 0;
            return countB - countA;
          });
        }

        setCategories(sortedData);
        const paginationMeta = meta?.pagination || null;
        if (paginationMeta) setMetaCategories(paginationMeta);

        // Marcamos como fetch inicial realizado
        setHasFetched(true);

        // Save to cache
        cache.current.set(cacheKey, { data: sortedData, meta: paginationMeta });
      }
    } catch (error) {
      console.error("Error al cargar categorías:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSortBy(SORT_OPTIONS.NOMBRE_ASC);
    setHasFetched(false); // Permitimos recargar datos originales
  };

  return (
    <CategoriasContext
      value={{
        categories,
        metaCategories,
        isLoading,
        error,
        searchQuery,
        sortBy,
        setSearchQuery,
        setSortBy,
        setCategories,
        setMetaCategories,
        fetchCategorias,
        handleResetFilters,
      }}
    >
      {children}
    </CategoriasContext>
  );
}
