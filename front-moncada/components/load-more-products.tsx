"use client";

import SectionHeader from "@/components/sections/section-header";
import SkeletonLoad from "@/components/ui/skeleton/skeleton-load";
import { Button } from "@/components/ui/button";
import { IconPackageOff } from "@tabler/icons-react";
import Link from "next/link";
import { ProductCategory, Producto, TComponentChild } from "@/types/typos";
import { Suspense, useEffect, useMemo, useState } from "react";
// import { categoriasMook } from "@/lib/mock";

export default function ProductsPagination({
  products,
  fetchRute,
  minHeight = "min-h-screen",
  ComponentChild,
  sectionHeaderTexts,
  isLoading = false,
  skeletonType = "product",
  itemsPerPage = 3
}: {
  itemsPerPage?: number;
  products?: (Producto | ProductCategory)[];
  fetchRute: string;
  ComponentChild: TComponentChild;
  minHeight?: string;
  slugCategory?: string;
  isLoading?: boolean;
  skeletonType?: "product" | "category";
  sectionHeaderTexts: {
    badgeText?: string;
    title: string;
    description?: string;
    className?: string;
  };
}) {
  const ITEMS_PER_PAGE = itemsPerPage;
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");

  // Calculamos los productos a mostrar y meta-información de forma local
  const { productosAMostrar, pageCount } = useMemo(() => {
    // Si estamos cargando y no hay productos, devolvemos array vacío para disparar el loading
    if (isLoading && (!products || products.length === 0)) {
      return { productosAMostrar: [], pageCount: 1 };
    }

    const total = products?.length ?? 0;
    const count = Math.ceil(total / ITEMS_PER_PAGE);

    // Fallback a mocks solo si NO hay carga activa y NO hay productos cargados
    if (!isLoading && (!products || products.length === 0)) {
      return {
        productosAMostrar: fetchRute === "categorias" ? [] : [],
        pageCount: 1
      };
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return {
      productosAMostrar: products?.slice(startIndex, endIndex) ?? [],
      pageCount: count || 1
    };
  }, [products, currentPage, fetchRute, isLoading]);

  // Resetear a página 1 si cambian los productos (ej. cambio de categoría)
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  return (
    <section
      className={`relative pb-10 ${minHeight === "min-h-screen" ? "border-b border-border" : ""}`}
    >
      {/* Background decoration */}
      <div
        className={`relative max-w-300 mx-auto px-4 md:px-8 flex flex-col justify-between ${minHeight}`}
      >
        <SectionHeader
          className={sectionHeaderTexts.className ?? "mb-0!"}
          badgeContent={sectionHeaderTexts.badgeText}
          title={sectionHeaderTexts.title}
          description={sectionHeaderTexts.description}
        />

        <Suspense fallback={<SkeletonLoad itemsSkeleton={3} type={skeletonType} />}>
          {isLoading && (!products || products.length === 0) ? (
            <SkeletonLoad itemsSkeleton={3} type={skeletonType} />
          ) : !isLoading && (!products || products.length === 0) ? (
            <EmptyResult />
          ) : ComponentChild ? (
            <ComponentChild outProducts={productosAMostrar} />
          ) : null}
        </Suspense>
        {/* botones de paginacion */}
        {products && products.length > ITEMS_PER_PAGE ? (
          <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 mt-8 pb-8">
            <Button
              variant="default"
              className="hover:bg-text-dark text-sm sm:text-base capitalize px-3 sm:px-4"
              type="button"
              disabled={currentPage === 1 || !productosAMostrar?.length || isLoading}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              anterior
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: pageCount }).map((_, i) => (
                <Button
                  onClick={() => setCurrentPage(i + 1)}
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  disabled={isLoading}
                  className={`text-sm sm:text-base min-w-10 sm:min-w-12 ${currentPage === i + 1
                    ? "bg-accent text-white hover:bg-accent/90"
                    : "hover:bg-accent/10"
                    }`}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="default"
              className="hover:bg-text-dark text-sm sm:text-base capitalize px-3 sm:px-4"
              type="button"
              disabled={currentPage === pageCount || !productosAMostrar?.length || isLoading}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              siguiente
            </Button>
          </nav>) :
          (
            <div className="py-4"></div>
          )
        }
      </div>
    </section>
  );
}

function EmptyResult() {
  return (
    <div className="relative py-20 px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in-up">
        {/* Icon with animated background */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white border-2 border-accent/20 text-accent shadow-2xl">
            <IconPackageOff className="w-12 h-12" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-3xl md:text-4xl font-display font-black text-text-dark tracking-tight">
            Colección en Proceso de <span className="text-accent italic">Curaduría</span>
          </h3>
          <p className="text-lg text-text-dark/60 max-w-lg mx-auto leading-relaxed font-medium">
            Nuestros artesanos y curadores están trabajando arduamente para traerte lo mejor de Moncada. Muy pronto descubrirás piezas excepcionales en esta sección.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            asChild
            variant="secondary"
            className="w-full sm:w-auto px-8 py-6 rounded-full  text-white font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
          >
            <Link href="/colecciones">Explorar otras colecciones</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
