"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { STRAPI_URL } from "@/lib/const";
import { ViewTransition } from "react";

interface CategoryPremiumCardProps {
    id: string | number;
    title: string;
    slug: string;
    imageUrl: string;
    index: number;
}

export default function CategoryPremiumCard({
    title,
    slug,
    imageUrl,
    index
}: CategoryPremiumCardProps) {
    const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${STRAPI_URL}${imageUrl}`;

    return (
        <Link
            href={`/${slug}`}
            className="group relative rounded-2xl overflow-hidden bg-white border border-border hover:border-accent/90 hover-lift shadow-sm hover:shadow-2xl transition-all duration-700 h-full flex flex-col"
            style={{ animationDelay: `${index * 0.1}s` }}
            role="listitem"
            aria-label={`Ver colección: ${title}`}
        >
            {/* Image with enhanced effects */}
            <div

                className="relative w-full h-full shrink-0 overflow-hidden">
                <ViewTransition name={`categoria-${slug}`}>
                    <img
                        src={fullImageUrl}
                        alt={title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                </ViewTransition>

                {/* Glass Overlay - Improved aesthetic */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-700" />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-display text-3xl md:text-4xl font-black text-white tracking-tight mb-4 drop-shadow-lg">
                        {title}
                    </h3>

                    <div className="flex items-center justify-between pt-4 border-t border-white/30">
                        <span className="text-xs text-white font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            Explorar Colección
                        </span>
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center transform group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-xl overflow-hidden group-hover:scale-110 group-hover:translate-x-2">
                            <IconArrowRight size={20} className="group-hover:translate-x-0 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative element */}
            <div className="absolute top-6 right-6">
                <Badge className="bg-accent hover:bg-accent-hover backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                    Premium
                </Badge>
            </div>
        </Link >
    );
}
