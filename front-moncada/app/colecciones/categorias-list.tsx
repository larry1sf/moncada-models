'use client'

import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useProductosContext } from "@/context/productos-context";
import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import { useSizeScreen } from "@/hooks/useSizeScreen";
import { CardSkeleton } from "@/components/ui/skeleton/card-skeleton";
import { ProductCategory } from "@/types/typos";
import SectionCategories from "@/components/categorias/section-categories";
import { Pagination } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { IconX, IconSortAscendingLetters, IconSortDescendingLetters, IconPackage } from "@tabler/icons-react";
import { SORT_OPTIONS } from "@/lib/const";
import { TSortOption } from "@/types/typos";

// Hook para manejar el tamaño de página según el ancho de pantalla
function usePageSizeByWidth({ handleChangePage, totalPages }: { handleChangePage: (page: number) => void, totalPages: number }) {
    const getPageSizeByWidth = (width: number): number => {
        if (width < 640) return 1;  // Móvil: 1 columna
        if (width < 1024) return 4; // Tablet: 2 columnas
        return 6;                   // Desktop: 3 columnas
    }

    const { width } = useSizeScreen()
    const previousPageSizeRef = useRef<number | null>(null);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (width === 0) return;

        const newPageSize = getPageSizeByWidth(width);

        if (isInitialMount.current) {
            previousPageSizeRef.current = newPageSize;
            isInitialMount.current = false;
            return;
        }

        if (newPageSize !== previousPageSizeRef.current) {
            handleChangePage(1);
            previousPageSizeRef.current = newPageSize;
        }
    }, [width, handleChangePage])
}

export default function CategoriasList() {
    const { categoriasHeaders, isLoadingC } = useProductosContext();
    
    // Estados locales para filtros
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<TSortOption>(SORT_OPTIONS.NOMBRE_ASC);
    const [currentPage, setCurrentPage] = useState(1);
    
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Filtrado y ordenamiento client-side
    const filteredCategories = useMemo(() => {
        let result = [...categoriasHeaders];
        
        // Filtrar por búsqueda
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(cat => 
                cat.title.toLowerCase().includes(query)
            );
        }
        
        // Ordenar
        result.sort((a, b) => {
            switch (sortBy) {
                case SORT_OPTIONS.NOMBRE_ASC:
                    return a.title.localeCompare(b.title);
                case SORT_OPTIONS.NOMBRE_DESC:
                    return b.title.localeCompare(a.title);
                case SORT_OPTIONS.MAS_POPULAR:
                    return b.productCount - a.productCount;
                default:
                    return 0;
            }
        });
        
        return result;
    }, [categoriasHeaders, searchQuery, sortBy]);

    // Paginación
    const { width } = useSizeScreen();
    const itemsPerPage = useMemo(() => {
        if (width === 0) return 6;
        if (width < 640) return 1;
        if (width < 1024) return 4;
        return 6;
    }, [width]);

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage) || 1;
    const paginatedCategories = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredCategories.slice(start, start + itemsPerPage);
    }, [filteredCategories, currentPage, itemsPerPage]);

    // Debounced search
    const [localSearchQuery, setLocalSearchQuery] = useState("");
    
    useEffect(() => {
        if (debounceTimerRef.current)
            clearTimeout(debounceTimerRef.current);

        debounceTimerRef.current = setTimeout(() => {
            setSearchQuery(localSearchQuery);
            setCurrentPage(1);
        }, 300);

        return () => {
            if (debounceTimerRef.current)
                clearTimeout(debounceTimerRef.current);
        };
    }, [localSearchQuery]);

    usePageSizeByWidth({ 
        handleChangePage: setCurrentPage, 
        totalPages 
    });

    // Convertir CategoryHeader[] a ProductCategory[]
    const categoriesForDisplay: ProductCategory[] = useMemo(() => {
        return paginatedCategories.map(header => ({
            id: header.id,
            documentId: '',
            title: header.title,
            slug: header.slug,
            description: '',
            image: header.image,
            products: []
        }));
    }, [paginatedCategories]);

    const handleResetFilters = () => {
        setLocalSearchQuery("");
        setSearchQuery("");
        setSortBy(SORT_OPTIONS.NOMBRE_ASC);
        setCurrentPage(1);
    };

    const handleSortClick = (id: TSortOption) => {
        setSortBy(id);
        setCurrentPage(1);
    };

    if (isLoadingC) return <GridProductsLoading />

    return (
        <div className="flex flex-col gap-10 sm:gap-12 lg:gap-16 w-full">
            {/* Filter Bar */}
            <div className="z-30 pt-6 pb-2 -mx-4 px-4">
                <section className="relative flex flex-col gap-3 p-3 bg-white/60 bg-linear-to-br from-white/60 via-white/30 to-white/40 backdrop-blur-2xl backdrop-saturate-200 border border-white/40 rounded-3xl shadow-2xl shadow-black/5 overflow-visible">
                    <header className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-3">
                        {/* Search Input */}
                        <div className="relative w-full md:max-w-md group">
                            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/50 group-focus-within:text-accent transition-colors" />
                            <Input
                                placeholder="Buscar en nuestras colecciones..."
                                className="pl-12 pr-4 py-6 bg-white/80 text-zinc-800 placeholder:text-zinc-500 border border-accent/50 focus-visible:border-accent/60 rounded-2xl shadow-sm transition-all font-semibold"
                                value={localSearchQuery}
                                onChange={(e) => setLocalSearchQuery(e.target.value)}
                            />
                            {localSearchQuery && (
                                <button
                                    onClick={() => {
                                        setLocalSearchQuery("");
                                        setSearchQuery("");
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-accent/10 text-accent transition-colors"
                                >
                                    <IconX size={16} />
                                </button>
                            )}
                        </div>

                        {/* Filter Actions + Chips */}
                        <nav className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full md:w-auto">
                            <div className="grid grid-cols-3 gap-2 w-full md:w-auto min-w-85">
                                {[
                                    { id: SORT_OPTIONS.NOMBRE_ASC, icon: <IconSortAscendingLetters size={18} />, label: "A-Z" },
                                    { id: SORT_OPTIONS.NOMBRE_DESC, icon: <IconSortDescendingLetters size={18} />, label: "Z-A" },
                                    { id: SORT_OPTIONS.MAS_POPULAR, icon: <IconPackage size={18} />, label: "Popular" }
                                ].map((option) => (
                                    <Button
                                        key={option.id}
                                        variant={sortBy === option.id ? "default" : "outline"}
                                        onClick={() => handleSortClick(option.id as TSortOption)}
                                        className={`
                                            w-full justify-center rounded-2xl gap-2 font-bold transition-all p-4 h-auto border
                                            ${sortBy === option.id
                                            ? "bg-accent/80 text-white border-accent/60 shadow-md"
                                            : "bg-white hover:text-accent text-zinc-600 border-accent/50 hover:border-accent/60 hover:bg-accent/10"
                                        }
                                        `}
                                    >
                                        {option.icon}
                                        <span className="hidden sm:inline">{option.label}</span>
                                    </Button>
                                ))}
                            </div>

                            <div className="h-10 w-px bg-accent/20 mx-1 hidden md:block" />

                            <Badge variant="default" className="bg-accent text-white font-extrabold rounded-2xl px-5 py-4 shadow-lg shadow-accent/30 border-0 whitespace-nowrap hover:bg-accent transition-custom h-full ">
                                {filteredCategories.length} Colecciones
                            </Badge>
                        </nav>
                    </header>
                    
                    {/* Chips activos */}
                    {(searchQuery.length > 0 || sortBy !== SORT_OPTIONS.NOMBRE_ASC) && (
                        <footer className="flex flex-wrap gap-2 items-center px-0">
                            {searchQuery && (
                                <Badge className="bg-[rgba(196,164,122,0.18)] text-text-dark hover:text-cream border-[#c4a47a] shadow-accent/10 shadow rounded-2xl px-4 py-1 flex items-center gap-2">
                                    Búsqueda: {searchQuery}
                                    <IconX size={14} className="cursor-pointer" onClick={handleResetFilters} />
                                </Badge>
                            )}

                            <Badge className="bg-[rgba(196,164,122,0.18)] text-text-dark hover:text-cream transition-custom  border-[#c4a47a] shadow-accent/10 shadow rounded-2xl px-4 py-1 flex items-center gap-2">
                                Orden: {
                                    sortBy === "name-desc"
                                        ? "Z-A" :
                                        sortBy === "products-desc"
                                            ? "Popularidad"
                                            : "A-Z"
                                }
                                <IconX size={14} className="cursor-pointer" onClick={() => setSortBy(SORT_OPTIONS.NOMBRE_ASC)} />
                            </Badge>
                        </footer>
                    )}
                </section>
            </div>

            {/* Grid */}
            {filteredCategories.length > 0 ? (
                <GridProducts
                    categories={categoriesForDisplay}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            ) : (
                <GridProductsEmpty
                    searchQuery={searchQuery}
                    handleResetFilters={handleResetFilters}
                />
            )}
        </div>
    );
}

function GridProducts({
    categories,
    currentPage,
    totalPages,
    onPageChange
}: {
    categories: ProductCategory[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) {
    const { width } = useSizeScreen();

    const getMinHeight = () => {
        if (width === 0) return "750px";
        if (width < 640) return "448px";
        if (width < 1024) return "928px";
        return "750px";
    };

    return (
        <div className="space-y-10">
            <div
                className="content-start transition-opacity duration-300"
                style={{ minHeight: getMinHeight() }}
            >
                <SectionCategories outProducts={categories} />
            </div>

            {totalPages > 1 && (
                <div className="pt-4 border-t border-accent/5">
                    <Pagination
                        currentPage={currentPage}
                        pageCount={totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </div>
    );
}

function GridProductsEmpty({ searchQuery, handleResetFilters }: { searchQuery: string, handleResetFilters: () => void }) {
    return (
        <article className="flex flex-col items-center justify-center py-8 text-center">
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
