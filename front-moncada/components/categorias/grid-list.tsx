"use client";

import { IconSearch } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useCategorias } from "@/context/categorias-context";
import { useEffect, useRef, useCallback } from "react";
import { useSizeScreen } from "@/hooks/useSizeScreen";
import { CardSkeleton } from "@/components/ui/skeleton/card-skeleton";
import { ProductCategory, responseMetaApi } from "@/types/typos";
import SectionCategories from "@/components/categorias/section-categories";
import { Pagination } from "@/components/ui/pagination";

function usePageSizeByWidth({ handleChangePage, metaCategories }: { handleChangePage: ({ page, pageSize }: { page: number, pageSize?: number }) => void, metaCategories: responseMetaApi["pagination"] }) {

    const getPageSizeByWidth = (width: number): number => {
        if (width < 640) {
            // Móvil: 1 columna
            return 1;
        } else if (width < 1024) {
            // Tablet: 2 columnas
            return 4;
        } else {
            // Desktop: 3 columnas
            return 6;
        }
    }

    const { width } = useSizeScreen()
    const previousPageSizeRef = useRef<number | null>(null);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (!metaCategories || width === 0) return;

        const newPageSize = getPageSizeByWidth(width);
        const currentPageSize = metaCategories.pageSize;

        // En el primer montaje, solo guardar el pageSize actual
        if (isInitialMount.current) {
            previousPageSizeRef.current = currentPageSize;
            isInitialMount.current = false;
            return;
        }

        // Solo actualizar si el pageSize cambió realmente
        if (newPageSize !== previousPageSizeRef.current && newPageSize !== currentPageSize) {
            // Resetear a la página 1 cuando cambia el tamaño de pantalla
            handleChangePage({ page: 1, pageSize: newPageSize });
            previousPageSizeRef.current = newPageSize;
        }
    }, [width, metaCategories, handleChangePage])
}

export default function GridList() {
    const {
        categories: filteredAndSortedCollections,
        searchQuery,
        metaCategories,
        handleResetFilters,
        fetchCategorias: fetchFilteredCategories,
        isLoading
    } = useCategorias()

    const handleChangePage = useCallback(({ page, pageSize }: { page: number, pageSize?: number }) => {
        if (metaCategories) {
            const newPageSize = pageSize ?? metaCategories.pageSize;
            fetchFilteredCategories({ page, pageSize: newPageSize });
        }
    }, [metaCategories, fetchFilteredCategories])

    usePageSizeByWidth({ handleChangePage, metaCategories: metaCategories! })

    if (!filteredAndSortedCollections) return <GridProductsLoading />
    return (
        filteredAndSortedCollections.length > 0 && metaCategories ?
            <GridProducts
                filteredAndSortedCollections={filteredAndSortedCollections}
                metaCategories={metaCategories}
                handleChangePage={handleChangePage}
                isLoading={isLoading}
            />
            :
            <GridProductsEmpty
                searchQuery={searchQuery}
                handleResetFilters={handleResetFilters} />
    )
}

function GridProducts({
    filteredAndSortedCollections,
    metaCategories,
    handleChangePage,
    isLoading
}: {
    filteredAndSortedCollections: ProductCategory[];
    metaCategories: responseMetaApi["pagination"];
    handleChangePage: (page: { page: number; pageSize?: number }) => void;
    isLoading: boolean;
}) {
    const { width } = useSizeScreen();

    const getMinHeight = () => {
        // Category card height = 448px (h-[28rem])
        // Mobile: 1 column, 1 item per page
        // Tablet: 2 columns, 4 items = 2 rows
        // Desktop: 3 columns, 6 items = 2 rows

        if (width === 0) return "750px"; // Default fallback

        if (width < 640) {
            // Mobile: 1 item × 448px (showing 1 item per page)
            return "448px";
        } else if (width < 1024) {
            // Tablet: 2 rows × 448px + 1 gap (32px)
            return "928px";
        } else {
            // Desktop: 2 rows × 448px + 1 gap (32px)
            return "750px";
        }
    };

    const handlePageChangeWithScroll = (page: number) => {
        handleChangePage({ page });
    };

    return (
        <div className="space-y-10 ">
            <div
                className={`content-start transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
                style={{ minHeight: getMinHeight() }}
            >
                <SectionCategories outProducts={filteredAndSortedCollections} />
            </div>

            {metaCategories.pageCount > 1 && (
                <div className="pt-4 border-t border-accent/5">
                    <Pagination
                        currentPage={metaCategories.page}
                        pageCount={metaCategories.pageCount}
                        onPageChange={handlePageChangeWithScroll}
                    />
                </div>
            )}
        </div>
    );
}

function GridProductsEmpty({ searchQuery, handleResetFilters }: { searchQuery: string, handleResetFilters: () => void }) {
    return (
        <article className="flex flex-col items-center justify-center py-8 text-center" >
            <div className="w-24 h-24 bg-accent/5 rounded-full flex items-center justify-center mb-6 text-accent animate-pulse">
                <IconSearch size={48} />
            </div>
            <h3 className="font-display text-3xl font-bold text-text-dark mb-4">No encontramos lo que buscas</h3>
            <p className="text-text-medium max-w-md mx-auto mb-8 italic">
                No hay colecciones que coincidan con tu búsqueda "{searchQuery}". Intenta con otros términos.
            </p>
            <Button
                onClick={handleResetFilters}
                variant="outline"
                className="rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-6 font-bold"
            >
                Limpiar todos los filtros
            </Button>
        </article>
    )
}

function GridProductsLoading() {
    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
                {Array.from({ length: 6 }).map((_, index) => (
                    <CardSkeleton key={index} variant="category" />
                ))}
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 mt-8 pb-8">
                <Button variant="default" className="hover:bg-text-dark text-sm sm:text-base capitalize px-3 sm:px-4" disabled>
                    anterior
                </Button>
                <Button variant="default" className="hover:bg-text-dark text-sm sm:text-base capitalize px-3 sm:px-4" disabled>
                    siguiente
                </Button>
            </nav>
        </div>
    )
}
