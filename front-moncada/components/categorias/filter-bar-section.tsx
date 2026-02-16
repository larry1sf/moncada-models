"use client";

import { useState, memo, useEffect, useRef } from "react";
import {
    IconSearch,
    IconSortAscendingLetters,
    IconSortDescendingLetters,
    IconPackage,
    IconX
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ProductCategory, responseMetaApi, TSort, TSortOption } from "@/types/typos";
import { useCategorias } from "@/context/categorias-context";

const SORT_OPTIONS: TSort = {
    NOMBRE_ASC: "name-asc",
    NOMBRE_DESC: "name-desc",
    MAS_POPULAR: "products-desc"
}

function FilterBarSection({ initialCollections, initialMetaCollections }: {
    initialCollections: ProductCategory[];
    initialMetaCollections: responseMetaApi["pagination"]
}) {
    const {
        searchQuery,
        sortBy,
        categories: sortCategories,
        setSearchQuery,
        setSortBy,
        fetchCategorias: fetchFilteredCategories,
        handleResetFilters
    } = useCategorias();

    const [localSearchQuery, setLocalSearchQuery] = useState("");
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Debounced search effect
    useEffect(() => {
        if (debounceTimerRef.current)
            clearTimeout(debounceTimerRef.current);


        debounceTimerRef.current = setTimeout(() => {
            if (localSearchQuery !== searchQuery)
                setSearchQuery(localSearchQuery);

        }, 300);

        return () => {
            if (debounceTimerRef.current)
                clearTimeout(debounceTimerRef.current);

        };
    }, [localSearchQuery]);

    // Fetch filtered data when search or sort changes
    useEffect(() => {
        if (searchQuery !== "" || sortBy !== SORT_OPTIONS.NOMBRE_ASC)
            fetchFilteredCategories({ page: 1 });

    }, [searchQuery, sortBy]);

    // actualizamos al id del sort seleccionado.
    const handleSortClick = (id: TSortOption) => setSortBy(id);

    // resetea los filtros locales y del contexto.
    const handleResetFiltersLocal = () => {
        setLocalSearchQuery("");
        handleResetFilters();
    };

    const displayedCollections = sortCategories ?? initialCollections;

    return (
        <div className="z-30 pt-6 pb-2 -mx-4 px-4">
            <section className="relative flex flex-col gap-3 p-6 bg-white/60 bg-linear-to-br from-white/60 via-white/30 to-white/40 backdrop-blur-2xl backdrop-saturate-200 border border-white/40 rounded-3xl shadow-2xl shadow-black/5 overflow-visible">
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
                        <div className="grid grid-cols-3 gap-2 w-full md:w-auto min-w-[340px]">
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
                            {displayedCollections.length} Colecciones
                        </Badge>
                    </nav>
                </header>
                {/* Chips activos visualmente integrados */}
                <footer className="flex flex-wrap gap-2 items-center px-0">
                    {searchQuery && (
                        <Badge className="bg-[rgba(196,164,122,0.18)] text-text-dark hover:text-cream border-[#c4a47a] shadow-accent/10 shadow rounded-2xl px-4 py-1 flex items-center gap-2">
                            Búsqueda: {searchQuery}
                            <IconX size={14} className="cursor-pointer" onClick={handleResetFiltersLocal} />
                        </Badge>
                    )}
                    {sortBy !== SORT_OPTIONS.NOMBRE_ASC && (
                        <Badge className="bg-[rgba(196,164,122,0.18)] text-text-dark hover:text-cream transition-custom  border-[#c4a47a] shadow-accent/10 shadow rounded-2xl px-4 py-1 flex items-center gap-2">
                            Orden: {
                                sortBy === "name-desc"
                                    ? "Z-A" :
                                    sortBy === "products-desc"
                                        ? "Popularidad"
                                        : "Productos asc"
                            }
                            <IconX size={14} className="cursor-pointer" onClick={() => setSortBy(SORT_OPTIONS.NOMBRE_ASC)} />
                        </Badge>
                    )}
                </footer>
            </section>
        </div>
    )
}
export default memo(FilterBarSection);