"use client";

import CategoryPremiumCard from "@/components/categorias/category-premium-card";
import ErrorSection from "@/components/sections/error-section";
import { ProductCategory } from "@/types/typos";
import { CardSkeleton } from "@/components/ui/skeleton/card-skeleton";
import { useProductosContext } from "@/context/productos-context";

export default function SectionCategories({
  outProducts,
}: {
  outProducts?: ProductCategory[];
}) {

  const { categoriasHeaders, isLoadingC } = useProductosContext() ?? outProducts
  const categoriasMostrar = categoriasHeaders ?? outProducts ?? [];
  const isError = !isLoadingC && !categoriasMostrar.length
  return (
    <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
      {
        isError && <ErrorSection messages={{
          title: "No Ahi categorias disponibles",
          description: "Por el momento no encontramos categorias, intenta de nuevo mas tarde."
        }} />
      }
      {
        isLoadingC && !categoriasMostrar.length ? (
          Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} variant="category" />
          ))
        ) : (
            categoriasMostrar
              // ?.filter(({ image }) => image?.url)
              ?.map(({ id, title, slug, image }, index) => (
                <CategoryPremiumCard
                  key={slug}
                  id={id}
                  title={title}
                  slug={slug}
                  imageUrl={image?.url ?? "fail image"}
                  index={index}
                />
              )
          )
        )
      }
    </article>
  );
}
