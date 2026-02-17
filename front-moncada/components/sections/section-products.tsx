"use client";

import ProductCard from "@/components/product-card";
import { Producto } from "@/types/typos";
import { CardSkeleton } from "@/components/ui/skeleton/card-skeleton";
import { useProductosContext } from "@/context/productos-context";
import { useCallback } from "react";
import ErrorSection from "@/components/sections/error-section";
export default function SectionProducts({
  itemsPerPage = 3,
  outProducts,
}: {
  itemsPerPage?: number;
  outProducts?: Producto[];
}) {
  const { productos: productosContext, loading: loadingContext } = useProductosContext();

  const productosAMostrar = useCallback(() => outProducts ?? productosContext.data ?? [],
    [outProducts, productosContext.data])

  const isLoading = outProducts ? false : loadingContext;
  const isError = !isLoading && productosAMostrar()?.length === 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">

      {
        isError && <ErrorSection className="col-span-full row-span-full" />
      }
      {
        isLoading ? (
          Array.from({ length: itemsPerPage }).map((_, i) => (
            <CardSkeleton key={i} />
          ))
        ) : (
          productosAMostrar()?.map((producto) => (
            <ProductCard viewCop key={producto.id} {...producto} />
          ))
        )
      }
    </div>
  );
}
