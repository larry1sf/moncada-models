"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IconMenu, IconX, IconChevronRight, IconChevronDown } from "@tabler/icons-react";
import { useCategorias } from "@/context/categorias-context";
import Spinner from "@/components/ui/spinner";
import { CategoryHeader } from "@/types/typos";
import { useProductosContext } from "@/context/productos-context";
import { CartSheet } from "@/components/cart-sheet";

export default function Header() {
    const [categoriasHeaders, setCategoriasHeaders] = useState<CategoryHeader[]>([])
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [isScrolled, setIsScrolled] = useState(false);
    const { categories, fetchCategorias, isLoading: isLoadingC, error: errorCategories } = useCategorias()
    const { productos, fetchProductos, error: errorProducts } = useProductosContext()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // sacamos las categorias que mostramos en el boton del menu
    // pedimos las categorias iniciales del contexto
    useEffect(() => {
        if (categories) {
            const formatCategoryMenu = categories.map(({ title, slug, products }) => ({
                title,
                slug,
                productCount: products?.length ?? 0
            }))
            setCategoriasHeaders(formatCategoryMenu)
        } else if (!errorCategories) {
            fetchCategorias()
        }
    }, [categories, errorCategories])

    // pedimos los productos iniciales del contacto
    useEffect(() => {
        if (productos.data.length || errorProducts) return

        fetchProductos()
    }, [productos, errorProducts])

    return (
        <>
            <header
                className={`sticky top-0 z-100 w-full transition-custom ${isScrolled
                    ? "bg-white/98 backdrop-blur-md shadow-md border-b border-accent/15"
                    : "bg-white/98 backdrop-blur-md border-b border-accent/15"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-8">
                    <Link href="/" className="flex items-center gap-3 transition-custom hover:-translate-y-0.5">
                        <div className="w-10 h-10 bg-linear-to-br from-accent to-accent-hover text-white flex items-center justify-center font-display text-2xl font-bold rounded-lg shadow-sm">
                            M
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="font-display text-xl font-bold text-text-dark tracking-tight">Moncada</span>
                            <span className="font-sans text-[0.7rem] font-medium text-accent tracking-[0.15em] uppercase">Models</span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
                        <Link href="/" className="text-text-dark font-medium hover:text-accent transition-custom relative group">
                            Inicio
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-accent to-accent-hover transition-custom group-hover:w-full"></span>
                        </Link>
                        <Link href="/#novedades" className="text-text-dark font-medium hover:text-accent transition-custom relative group">
                            Novedades
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-accent to-accent-hover transition-custom group-hover:w-full"></span>
                        </Link>
                        <Link href="/productos" className="text-text-dark font-medium hover:text-accent transition-custom relative group">
                            Productos
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-accent to-accent-hover transition-custom group-hover:w-full"></span>
                        </Link>

                        <div className="relative group/dropdown">
                            <button className="flex items-center gap-1.5 text-text-dark font-medium hover:text-accent transition-custom relative group">
                                Colecciones
                                <IconChevronDown className="w-3 h-3 transition-custom group-hover/dropdown:rotate-180" />
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-accent to-accent-hover transition-custom group-hover:w-full"></span>
                            </button>

                            <div className="absolute top-full left-1/2 translate-x-[-50%] pt-4 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300">
                                <div className="w-70 bg-white rounded-xl shadow-xl border border-accent/10 p-2 ">
                                    {!isLoadingC && categoriasHeaders?.map((category) => (
                                        <Link
                                            key={category.slug}
                                            href={`/${category.slug}`}
                                            className="flex items-center justify-between p-3.5 rounded-lg hover:bg-accent/5 text-text-dark hover:text-accent transition-custom"
                                        >
                                            <span className="font-medium text-[0.95rem]">{category.title}</span>
                                            <span className="text-xs text-text-medium font-normal bg-accent/5 px-2 py-1 rounded-full">
                                                {category.productCount} {category.productCount === 1 ? 'prod' : 'prods'}
                                            </span>
                                        </Link>
                                    ))}
                                    {isLoadingC && (
                                        <div className="mt-2 pt-2 min-h-44 flex items-center justify-center border-t border-accent/10">
                                            <Spinner />

                                        </div>
                                    )}
                                    <div className="mt-2 pt-2 border-t border-accent/10">
                                        <Link
                                            href="/colecciones"
                                            className="flex items-center justify-between p-3.5 rounded-lg bg-linear-to-br from-accent to-accent-hover text-white font-semibold transition-custom active:scale-95"
                                        >
                                            <span>Ver Todas</span>
                                            <IconChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link href="/nosotros/contactanos" className="text-text-dark font-medium hover:text-accent transition-custom relative group">
                            Contacto
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-accent to-accent-hover transition-custom group-hover:w-full"></span>
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">

                        <CartSheet />

                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden p-2.5 rounded-xl border border-accent/20 text-text-dark hover:bg-accent/5 hover:border-accent hover:text-accent transition-custom"
                        >
                            <IconMenu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 bg-text-dark/60 backdrop-blur-sm z-2000 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            <div
                className={`fixed top-0 right-0 h-full w-[85%] max-w-100 bg-bg-light z-2001 shadow-2xl transition-transform duration-500 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex items-center justify-between p-6 border-b border-accent/15 bg-white">
                    <span className="font-display text-xl font-bold text-text-dark">Menú</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-text-dark hover:bg-accent/5 rounded-lg transition-custom"
                    >
                        <IconX className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-80px)]">
                    <Link href="/" className="p-4 text-lg font-medium text-text-dark rounded-xl hover:bg-white hover:text-accent transition-custom">Inicio</Link>
                    <Link href="/#novedades" className="p-4 text-lg font-medium text-text-dark rounded-xl hover:bg-white hover:text-accent transition-custom">Novedades</Link>
                    <Link href="/productos" className="p-4 text-lg font-medium text-text-dark rounded-xl hover:bg-white hover:text-accent transition-custom">Productos</Link>
                    <div className="flex flex-col gap-1">
                        <button className="flex items-center justify-between p-4 text-lg font-medium text-text-dark rounded-xl hover:bg-white hover:text-accent transition-custom">
                            Colecciones
                            <IconChevronDown className="w-4 h-4" />
                        </button>
                        <div className="flex flex-col gap-1 pl-4">
                            {categoriasHeaders?.map((category) => (
                                <Link
                                    key={category.slug}
                                    href={`/${category.slug}`}
                                    className="p-3 text-base text-text-medium font-normal rounded-lg hover:bg-white hover:text-accent transition-custom border-l-2 border-transparent hover:border-accent"
                                >
                                    {category.title}
                                </Link>
                            ))}
                            <Link href="/colecciones" className="p-3 text-base text-accent font-semibold rounded-lg hover:bg-white transition-custom underline decoration-accent/30 underline-offset-4">
                                Ver todas
                            </Link>
                        </div>
                    </div>
                    <Link href="/nosotros/contactanos" className="p-4 text-lg font-medium text-text-dark rounded-xl hover:bg-white hover:text-accent transition-custom">Contacto</Link>
                </div>
            </div>
        </>
    );
}
