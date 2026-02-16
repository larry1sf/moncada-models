"use client";

import { useState, useEffect, useRef, memo } from "react";
import {
    IconSearch,
    IconFilter,
    IconX,
    IconChevronDown,
    IconChevronUp,
    IconSortDescending,
    IconSortAscending,
    IconUsers,
    IconShirt,
    IconCategory,
    IconCheck
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProductosContext } from "@/context/productos-context";
import { ProductCategory } from "@/types/typos";

interface Props {
    categories: ProductCategory[];
}

// const GENDER_OPTIONS = [
//     { value: "all", label: "Todos" },
//     { value: "hombre", label: "Hombre" },
//     { value: "mujer", label: "Mujer" },
//     { value: "niño", label: "Niño" },
//     { value: "niña", label: "Niña" },
// ];



//  

const SORT_OPTIONS = [
    { value: "createdAt:desc", label: "Nuevos y Populares", icon: <IconSortDescending size={16} /> },
    { value: "price:asc", label: "Menor Precio", icon: <IconSortAscending size={16} /> },
    { value: "price:desc", label: "Mayor Precio", icon: <IconSortDescending size={16} /> },
];

// Custom Select Component for better UX
const CustomSelect = ({
    value,
    onChange,
    options,
}: {
    value: string;
    onChange: (val: string) => void;
    options: { value: string; label: string }[];
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node))
                setIsOpen(false);

        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = options.find(opt => opt.value === value)?.label || "Seleccionar";

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full flex items-center justify-between bg-white border rounded-2xl px-4 py-3 text-sm font-bold transition-all
                    ${isOpen
                        ? "border-accent/60 ring-2 ring-accent/10 text-text-dark"
                        : "border-accent/50 text-zinc-600 hover:border-accent/60"}
                `}
            >
                <span className="truncate">{selectedLabel}</span>
                <IconChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <div className={`
                absolute z-50 left-0 right-0 top-[calc(100%+0.5rem)] bg-white border border-accent/20 rounded-2xl shadow-xl overflow-hidden
                transition-all duration-200 origin-top
                ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
            `}>
                <div className="max-h-60 overflow-y-auto p-1.5 space-y-1">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                            className={`
                                w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-colors
                                ${value === opt.value
                                    ? "bg-accent/10 text-accent"
                                    : "text-zinc-600 hover:bg-accent/5 hover:text-accent"}
                            `}
                        >
                            <span className="truncate">{opt.label}</span>
                            {value === opt.value && <IconCheck size={14} />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

function FilterBarProducts({ categories }: Props) {
    const { filters, setFilters, fetchProductos, resetFilters, productos, genderOptions, clothingTypeOptions } = useProductosContext();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [localSearch, setLocalSearch] = useState(filters.search);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // Handle Search Debounce
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            if (localSearch !== filters.search)
                setFilters({ search: localSearch });

        }, 500);
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [localSearch]);

    // Fetch on filter change
    useEffect(() => {
        fetchProductos({ page: 1 });
    }, [filters.gender, filters.clothingType, filters.slugCategory, filters.sort, filters.search, fetchProductos]);

    const activeFiltersCount = [
        filters.gender !== "all",
        filters.clothingType !== "all",
        filters.slugCategory !== "all",
        filters.search !== ""
    ].filter(Boolean).length;

    const categoryOptions = [
        { value: "all", label: "Todas las colecciones" },
        ...categories.map(cat => ({ value: cat.slug, label: cat.title }))
    ];

    return (
        <div className="z-40 w-full space-y-4">
            {/* Main Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center bg-white/60 bg-linear-to-br from-white/60 via-white/30 to-white/40 backdrop-blur-2xl backdrop-saturate-200 border border-white/40 p-3 rounded-3xl shadow-2xl shadow-black/5">
                {/* Search */}
                <div className="relative flex-1 group">
                    <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/50 group-focus-within:text-accent transition-colors" />
                    <Input
                        placeholder="Buscar productos..."
                        className="pl-12 pr-10 py-6 bg-white/80 border-accent/50 focus:border-accent/60 rounded-2xl font-semibold placeholder:text-zinc-500 text-zinc-800"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                    />
                    {localSearch && (
                        <button
                            onClick={() => setLocalSearch("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-accent/40 hover:text-accent"
                        >
                            <IconX size={18} />
                        </button>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        variant={isMenuOpen ? "default" : "outline"}
                        className={`
                            rounded-2xl py-6 px-6 font-bold flex gap-2 transition-all border
                            ${isMenuOpen ? "bg-accent text-white border-accent scale-105 shadow-md" : "border-accent/50 text-text-dark hover:bg-accent/10 hover:text-accent hover:border-accent/60"}
                        `}
                    >
                        <IconFilter size={20} />
                        <span>Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                        {isMenuOpen ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                    </Button>

                    <div className="hidden lg:flex items-center bg-accent/5 border border-accent/10 rounded-2xl p-1 self-stretch">
                        <Badge variant="outline" className="h-full border-none px-6 font-black text-accent text-sm uppercase tracking-tighter">
                            {productos.meta?.total ?? 0} PRODUCTOS
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Expanded Filters with Smooth Animation */}
            <div className={`
                grid transition-[grid-template-rows] duration-500 ease-in-out
                ${isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
            `}>
                <div className="overflow-hidden">
                    <div className="bg-white/80 border border-accent/20 rounded-3xl p-6 md:p-8 shadow space-y-8 mt-2 backdrop-blur-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Gender Filter */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-accent/80">
                                    <IconUsers size={16} /> Género
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {genderOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => setFilters({ gender: opt.value })}
                                            className={`
                                                w-full px-4 py-3 rounded-2xl text-sm font-bold transition-all border
                                                ${filters.gender === opt.value
                                                    ? "bg-accent/80 text-white border-accent/60 shadow-md scale-105"
                                                    : "bg-white text-text-dark border-accent/50 hover:border-accent/60 hover:bg-accent/10"}
                                            `}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Type Filter */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-accent/80">
                                    <IconShirt size={16} /> Estilo
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {clothingTypeOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => setFilters({ clothingType: opt.value })}
                                            className={`
                                                w-full flex items-center justify-center px-4 py-3 rounded-2xl text-sm font-bold transition-all border
                                                ${filters.clothingType === opt.value
                                                    ? "bg-accent/80 text-white border-accent/60 shadow-md scale-105"
                                                    : "bg-white text-zinc-600 border-accent/50 hover:border-accent/60 hover:bg-accent/10"}
                                            `}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-accent/80">
                                    <IconCategory size={16} /> Colecciones
                                </label>
                                <CustomSelect
                                    // label="Colección"
                                    value={filters.slugCategory}
                                    onChange={(val) => setFilters({ slugCategory: val })}
                                    options={categoryOptions}
                                />
                            </div>

                            {/* Sorting */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-accent/80">
                                    <IconFilter size={16} /> Ordenar
                                </label>
                                <div className="space-y-2">
                                    {SORT_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => setFilters({ sort: opt.value })}
                                            className={`
                                                w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all border
                                                ${filters.sort === opt.value
                                                    ? "bg-accent/80 text-white border-accent/60 shadow-md"
                                                    : "bg-white text-zinc-600 border-accent/50 hover:border-accent/60 hover:bg-accent/10"}
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                {opt.icon}
                                                {opt.label}
                                            </div>
                                            {filters.sort === opt.value && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Reset Footer */}
                        <div className="pt-6 border-t border-accent/10 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-2">
                                {filters.gender !== "all" && (
                                    <Badge className="bg-[rgba(196,164,122,0.18)] text-text-dark hover:text-white border-[#c4a47a] shadow-accent/10 shadow rounded-2xl px-4 py-1 flex items-center gap-2 transition-colors">
                                        Género: {filters.gender}
                                        <IconX size={12} className="cursor-pointer" onClick={() => setFilters({ gender: "all" })} />
                                    </Badge>
                                )}
                                {filters.clothingType !== "all" && (
                                    <Badge className="bg-[rgba(196,164,122,0.18)] text-text-dark hover:text-white border-[#c4a47a] shadow-accent/10 shadow rounded-2xl px-4 py-1 flex items-center gap-2 transition-colors">
                                        Estilo: {filters.clothingType}
                                        <IconX size={12} className="cursor-pointer" onClick={() => setFilters({ clothingType: "all" })} />
                                    </Badge>
                                )}
                                {filters.slugCategory !== "all" && (
                                    <Badge className="bg-[rgba(196,164,122,0.18)] text-text-dark hover:text-white border-[#c4a47a] shadow-accent/10 shadow rounded-2xl px-4 py-1 flex items-center gap-2 transition-colors">
                                        Cat.: {filters.slugCategory}
                                        <IconX size={12} className="cursor-pointer" onClick={() => setFilters({ slugCategory: "all" })} />
                                    </Badge>
                                )}
                            </div>

                            <Button
                                variant="ghost"
                                onClick={resetFilters}
                                className="text-accent hover:text-accent hover:bg-accent/5 font-black text-xs uppercase tracking-widest"
                            >
                                Restablecer todos los filtros
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(FilterBarProducts);
