"use client";

import { useRef, useEffect } from "react";
import { useProductosContext } from "@/context/productos-context";
import { ProductCategory } from "@/types/typos";
import ProductCard from "@/components/product-card";
import { CardSkeleton } from "@/components/ui/skeleton/card-skeleton";
import FilterBarProducts from "@/app/productos/filter-bar-products";
import { Button } from "@/components/ui/button";
import { IconPackageOff } from "@tabler/icons-react";
import { useSizeScreen } from "@/hooks/useSizeScreen";
import { Pagination } from "@/components/ui/pagination";

interface Props {
    categories: ProductCategory[];
}

function ProductsGrid() {
    const { productos, loading, fetchProductos } = useProductosContext();
    const { width } = useSizeScreen();

    const getItemsPerPage = (w: number) => {
        if (w === 0) return 6; // Default
        if (w < 640) return 2;  // Mobile: 2 items
        if (w < 1024) return 4; // Tablet: 4 items
        return 6;               // Desktop: 6 items
    };

    const itemsPerPage = getItemsPerPage(width);
    const previousItemsPerPage = useRef<number>(6);

    // Sync itemsPerPage on resize
    useEffect(() => {
        if (width === 0) return;
        const currentIP = getItemsPerPage(width);
        if (currentIP !== previousItemsPerPage.current && productos.meta) {
            fetchProductos({ page: 1, itemsPerPage: currentIP });
            previousItemsPerPage.current = currentIP;
        }
    }, [width, fetchProductos, productos.meta]);

    const handlePageChange = (page: number) => fetchProductos({ page, itemsPerPage });

    const getMinHeight = () => {
        if (width === 0) return "1150px"; // Default fallback

        if (width < 640) {
            // Mobile: 2 items × 550px + 1 gap (24px)
            return "1124px";
        } else if (width < 1024) {
            // Tablet: 2 rows × 550px + 1 gap (32px)
            return "1132px";
        } else {
            // Desktop: 2 rows × 550px + 1 gap (32px)
            return "1132px";
        }
    };

    if (!loading && productos.data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in text-zinc-900!">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                    <IconPackageOff className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">No se encontraron productos</h3>
                <p className="text-text-medium max-w-sm mx-auto">
                    Intenta ajustar tus filtros para encontrar lo que estás buscando.
                </p>
                <Button
                    variant="outline"
                    className="mt-6 border-accent text-accent hover:bg-accent hover:text-white rounded-full px-8"
                    onClick={() => window.location.reload()}
                >
                    Limpiar Filtros
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-10 ">
            <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 content-start transition-opacity duration-300`}
                style={{ minHeight: getMinHeight() }}
            >
                {loading && productos.data.length === 0 ? (
                    Array.from({ length: itemsPerPage }).map((_, i) => (
                        <CardSkeleton key={i} variant="product" />
                    ))
                ) : (
                    productos.data.map((producto, index) => (
                        <div
                            key={producto.id}
                            className={loading ? "opacity-50 animate-fade-in-up" : "opacity-100"}
                            style={
                                loading
                                    ? { animationDelay: `${(index % itemsPerPage) * 0.05}s` }
                                    : {}
                            }
                        >
                            <ProductCard {...producto} />
                        </div>
                    ))
                )}
            </div>

            {productos.meta && (
                <div className="pt-4 border-t border-accent/5">
                    <Pagination
                        currentPage={productos.meta.page}
                        pageCount={productos.meta.pageCount}
                        onPageChange={handlePageChange}
                        isLoading={loading}
                    />
                </div>
            )}
        </div>
    );
}

export default function ProductosClientPage({ categories }: Props) {
    return (
        <div className="flex flex-col gap-10 sm:gap-12 lg:gap-16">
            <FilterBarProducts categories={categories} />
            <ProductsGrid />
        </div>
    );
}
