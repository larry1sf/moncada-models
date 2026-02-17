'use client'

import ProductsPagination from "@/components/load-more-products"
import SectionProducts from "@/components/sections/section-products"
import SectionCategories from "@/components/categorias/section-categories"
import Link from "next/link";
import { categoriasMook } from "@/lib/mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import { STRAPI_URL } from "@/lib/const";
import { useProductosContext } from "@/context/productos-context";
import { useMemo } from "react";
import { ProductCategory, TComponentChild, Producto } from "@/types/typos";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { ViewTransition } from "react";
import Image from "next/image";

export default function ClientPage({ slug, initialCategory }: { slug: string, initialCategory?: ProductCategory }) {

    const { allProducts, categoriasHeaders, isLoadingC } = useProductosContext();

    // Obtener los productos de esta categoría filtrando allProducts
    const { products, category, otherCategories } = useMemo(() => {
        // Filtrar productos por categoría
        const categoryProducts = allProducts.filter(
            (product: Producto) => product.product_category?.slug === slug
        );

        // Encontrar la categoría actual en los headers
        const currentCategoryHeader = categoriasHeaders.find(c => c.slug === slug);
        
        // Construir el objeto de categoría completo
        const currentCategory: ProductCategory | undefined = initialCategory || (currentCategoryHeader ? {
            id: currentCategoryHeader.id,
            documentId: '',
            title: currentCategoryHeader.title,
            slug: currentCategoryHeader.slug,
            description: '',
            image: currentCategoryHeader.image,
            products: categoryProducts
        } : undefined);

        // Otras categorías (excluyendo la actual)
        const others = categoriasHeaders
            .filter(c => c.slug !== slug)
            .map(header => ({
                id: header.id,
                documentId: '',
                title: header.title,
                slug: header.slug,
                description: '',
                image: header.image,
                products: []
            }));

        return {
            products: categoryProducts,
            category: currentCategory,
            otherCategories: others.length > 0 ? others : (isLoadingC ? [] : categoriasMook)
        };
    }, [allProducts, categoriasHeaders, slug, initialCategory, isLoadingC]);

    const imagePreview = useMemo(() => {
        if (!category?.image?.url) return "";
        return category.image.url.startsWith("/")
            ? `${STRAPI_URL}${category.image.url}`
            : category.image.url;
    }, [category]);

    return (
        <>
            {/* Hero Section Enhanced */}
            <section className="relative overflow-hidden border-b border-border">
                <div className="relative max-w-300 mx-auto pb-16 px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Image Section */}
                        <article className="relative group animate-fade-in-up">
                            <ViewTransition name={`categoria-${category?.id}`}>
                                <figure className="relative w-full h-80 md:h-125 rounded-4xl overflow-hidden shadow-sm md:shadow-lg transform transition-all duration-1000 group-hover:scale-[1.02] border-2 border-accent/20">
                                    {!category ? (
                                        <Skeleton className="w-full h-full bg-zinc-200" />
                                    ) : (
                                        <>
                                                <img
                                                    loading="eager"
                                                    width={200}
                                                    height={200}
                                                src={imagePreview}
                                                alt={category?.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-linear-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                                            <figcaption className="absolute bottom-6 left-6 right-6 lg:hidden">
                                                <article className="bg-black/40 backdrop-blur-lg p-5 rounded-2xl border border-white/20">
                                                    <p className="text-2xl font-bold text-white mb-1 shadow-sm">
                                                        {category?.title}
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_white]" />
                                                        <span className="text-xs text-white font-bold uppercase tracking-[0.2em]">
                                                            Edición Limitada
                                                        </span>
                                                    </div>
                                                </article>
                                            </figcaption>
                                        </>
                                    )}
                                </figure>
                            </ViewTransition>
                        </article>

                        {/* Content Section */}
                        <article
                            className="flex flex-col gap-8 relative z-10 animate-fade-in-up"
                            style={{ animationDelay: "0.2s" }}
                        >
                            <Button
                                asChild
                                variant="secondary"
                                className="w-full md:w-fit"
                                aria-label="Regresar a la página de inicio"
                            >
                                <Link href="/colecciones">
                                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform transition-custom group-hover:-translate-x-1">
                                        <IconArrowLeft className="w-3 h-3 text-white" />
                                    </span>
                                    <span>
                                        Volver{" "}
                                        <span className="hidden md:inline">a las colecciones</span>
                                    </span>
                                </Link>
                            </Button>

                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-0.5 bg-accent" />
                                    <span className="text-accent text-sm font-extrabold uppercase tracking-[0.4em]">
                                        Colección Exclusiva
                                    </span>
                                </div>

                                {!category ? (
                                    <div className="space-y-4">
                                        <Skeleton className="h-16 w-3/4 bg-zinc-200" />
                                        <Skeleton className="h-24 w-full bg-zinc-200" />
                                    </div>
                                ) : (
                                    <>
                                        <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black text-text-dark tracking-tighter leading-[0.9] drop-shadow-sm">
                                            {category?.title}
                                        </h1>

                                        <p className="text-xl md:line-clamp-3 text-text-dark/80 leading-relaxed max-w-4xl font-medium italic">
                                            &quot;{category?.description}&quot;
                                        </p>
                                    </>
                                )}

                                <div className="flex flex-wrap items-center gap-4 mb-8">
                                    <Badge className="flex items-center gap-2 px-5 py-2.5 bg-text-dark text-white rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl border-none hover:bg-text-dark">
                                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_#C4A47A]" />
                                        <span>Calidad Premium</span>
                                    </Badge>
                                    {!category ? (
                                        <Skeleton className="h-10 w-32 rounded-full bg-zinc-200" />
                                    ) : (
                                        <Badge
                                            variant="outline"
                                            className="inline-flex items-center gap-3 px-6 py-2.5 bg-white shadow-xl text-text-dark font-black text-sm rounded-full border-2 border-accent/30 hover:bg-white"
                                        >
                                            <span className="text-accent underline decoration-4 underline-offset-4">
                                                {products.length}
                                            </span>
                                            <span className="text-text-dark uppercase tracking-widest text-[10px]">
                                                {products.length === 1
                                                    ? "pieza única"
                                                    : "piezas disponibles"}
                                            </span>
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Products Section Enhanced */}
            <ProductsPagination
                itemsPerPage={6}
                fetchRute="productos"
                products={products}
                slugCategory={slug}
                isLoading={isLoadingC}
                skeletonType="product"
                ComponentChild={SectionProducts as TComponentChild}
                sectionHeaderTexts={{
                    badgeText: "Curaduría de Alta Costura",
                    title: "Catálogo de Maestría",
                    description:
                        "Descubre piezas que trascienden el tiempo, seleccionadas minuciosamente para quienes buscan la excelencia en cada detalle.",
                }}
            />
            {/* Collections Section Enhanced */}
            <ProductsPagination
                products={otherCategories}
                slugCategory={slug}
                isLoading={isLoadingC}
                skeletonType="category"
                minHeight="min-h-[85vh]"
                fetchRute="categorias"
                ComponentChild={SectionCategories as TComponentChild}
                sectionHeaderTexts={{
                    badgeText: "Explora Nuestras Colecciones",
                    title: "Otras Colecciones",
                    description:
                        "Cada colección está diseñada con pasión para ayudarte a expresar tu estilo único.",
                }}
            />
        </>
    )
}
