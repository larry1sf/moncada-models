import { getProductos } from "@/service/get-producto";
import ProductCard from "@/components/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Producto } from "@/types/typos";

interface RelatedProductsProps {
  categorySlug: string;
  currentProductSlug: string;
}

export default async function RelatedProducts({
  categorySlug,
  currentProductSlug,
}: RelatedProductsProps) {
  const { data: products } = await getProductos({
    filterForCategory: categorySlug,
    itemsPerPage: 10,
  });

  const filteredProducts =
    (products as Producto[])?.filter((p) => p.slug !== currentProductSlug) ||
    [];

  if (filteredProducts.length === 0) return null;

  return (
    <section className="pt-16 border-t border-border">
      <div className="flex flex-col gap-2 mb-6">
        <span className="text-accent font-bold uppercase text-[10px] tracking-[0.3em]">
          Complementa tu Estilo
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-text-dark tracking-tight">
          También te puede gustar
        </h2>
      </div>
      <div className="relative group/related">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4 py-8">
            {filteredProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
              >
                <ProductCard className="hover:shadow-md!" {...product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious
              variant="default"
              size="icon"
              className={`scale-130 hover:scale-130 absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/related:opacity-100 transition-opacity duration-300 ${filteredProducts.length > 3 ? "" : "hidden"}`}
            />
            <CarouselNext
              variant="default"
              size="icon"
              className={`scale-130 hover:scale-130 absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/related:opacity-100 transition-opacity duration-300 ${filteredProducts.length > 3 ? "" : "hidden"}`}
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
