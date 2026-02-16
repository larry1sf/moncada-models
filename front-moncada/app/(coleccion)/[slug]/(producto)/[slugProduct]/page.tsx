import Link from "next/link";
import { productosMook } from "@/lib/mock";
import { IconChevronRight } from "@tabler/icons-react";
import { getProductos } from "@/service/get-producto";
import { notFound } from "next/navigation";
import { Producto } from "@/types/typos";
import ClientPage from "@/app/(coleccion)/[slug]/(producto)/[slugProduct]/client-page";
import Gallery from "@/components/gallery";
import ProductDetails from "@/app/(coleccion)/[slug]/(producto)/[slugProduct]/product-details";
import RelatedProducts from "@/app/(coleccion)/[slug]/(producto)/[slugProduct]/related-products";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CtaMoncadaModels from "@/components/cta-moncada-models";

export default async function Page({
  params,
}: {
  params: Promise<{ slugProduct: string }>;
}) {
  const { slugProduct } = await params;
  const { data: products } = await getProductos({ filterSlug: slugProduct });
  const objetProducts = products ?? productosMook;
  const product = objetProducts.find((p) => p.slug === slugProduct) as Producto;
  if (!product) notFound();
  return (
    <div className="pt-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-16 md:gap-20">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
        {/* Left Column: Gallery */}
        <article className="lg:sticky top-28">
          <Gallery
            slug={slugProduct}
            name={product.name}
            images={product.images}
          />
        </article>

        {/* Right Column: Info */}
        <article className="flex flex-col gap-8">
          <nav className="flex items-center gap-2 text-sm text-text-medium font-medium">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/"
                      className="hover:text-accent transition-colors"
                    >
                      Inicio
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <IconChevronRight className="w-3 h-3 opacity-50" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={`/${product.product_category.slug}`}
                      className="hover:text-accent transition-colors capitalize"
                    >
                      {product.product_category.title}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <IconChevronRight className="w-3 h-3 opacity-50" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-accent font-bold truncate">
                    {product.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>

          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <span className="text-accent font-bold uppercase text-[10px] tracking-[0.4em] mb-1 block opacity-80">
                {product.product_category.title}
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-text-dark tracking-tighter leading-[0.9]">
                {product.name}
              </h1>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="font-display text-4xl font-bold text-accent">
                ${product.price.toLocaleString()}
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-text-medium opacity-50">
                COP
              </span>
            </div>

            <ClientPage {...(product as Producto)} />
          </div>
        </article>
      </section>

      {/* Detailed Info (Tabs) */}
      <ProductDetails
        description={product.description}
        productTitle={product?.name}
      />

      {/* Related Products */}
      <RelatedProducts
        categorySlug={product.product_category.slug}
        currentProductSlug={product.slug}
      />

      {/* Brand Trust Section */}
      <CtaMoncadaModels />
    </div>
  );
}
