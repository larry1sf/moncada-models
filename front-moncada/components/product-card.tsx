"use client"

import Link from "next/link";
import { STRAPI_URL } from "@/lib/const";
import { Button } from "@/components/ui/button";
import { ProductCategory } from "@/types/typos";

interface ProductCardProps {
  slug: string;
  name: string;
  description: string;
  price: number;
  images: { url: string }[];
  product_category: ProductCategory;
  className?: string;
  viewCop?: boolean;
}

import { useState, ViewTransition } from "react";
// import Image from "next/image";
export default function ProductCard({
  slug,
  name,
  description,
  price,
  images,
  product_category,
  className,
  viewCop,
}: ProductCardProps) {
  const imageUrl = `${images[0]?.url.startsWith("http") ? `${images?.[0]?.url}` : `${STRAPI_URL}${images?.[0]?.url}`}`;
  const isNew = price > 45000;
  const slugCate = product_category?.slug;

  const [transitionanding, setTransitionanding] = useState(false)
  return (
    <div
      className={`group relative flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-border transition-custom hover:-translate-y-3 hover:border-accent hover:shadow-2xl h-full ${className}`}
    >
      <Link
        href={`/${slugCate}/${slug}`} onClick={() => setTransitionanding(true)}
        className="relative w-full aspect-3/4 overflow-hidden bg-bg-dark block"
      >
        <div className="absolute top-4 right-4 z-10 px-4 py-2 bg-linear-to-br from-accent to-accent-hover text-white text-[0.7rem] font-bold uppercase tracking-wider rounded-full shadow-lg">
          {isNew ? "Nuevo" : "Oferta"}
        </div>
        <ViewTransition name={transitionanding ? `producto-${slug}` : undefined}>
          <img
            width={250}
            height={400}
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </ViewTransition>
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-custom" />
      </Link>

      <div className="flex flex-col p-6 grow bg-white">
        <Link href={`/${slugCate}/${slug}`} className="h-13 mb-2 block">
          <h3 className="font-display text-xl font-bold text-text-dark tracking-tight leading-[1.3] group-hover:text-accent transition-custom line-clamp-2">
            {name}
          </h3>
        </Link>

        <div className="h-10 mb-6">
          <p className="text-sm text-text-medium/80 font-light font-sans line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-accent/50 group-hover:border-accent transition-custom">
          <div aria-label="Precio" title={price?.toLocaleString()} className="flex items-baseline gap-1">
            <span className="font-display truncate max-w-24 text-2xl font-bold text-accent tracking-tight">
              ${price?.toLocaleString()}
            </span>
            {viewCop ? (
              <span className="text-[0.6rem] hidden sm:block font-sans font-black tracking-widest uppercase opacity-40 ml-1">
                Cop
              </span>
            ) : null}
          </div>
          <Button asChild variant="secondary" size="sm">
            <Link href={`/${slugCate}/${slug}`}>ver mas</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
