"use client"
import { STRAPI_URL } from "@/lib/const"
import { Producto } from "@/types/typos"
import { useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ViewTransition } from "react"

export default function Gallery({
    slug,
    images,
    name
}: {
    slug: string,
    name: string,
    images: Producto["images"]
}) {
    const [selectedImage, setSelectedImage] = useState<number>(0);

    const handleImageChange = (index: number) => {
        if (index === selectedImage) return;
        setSelectedImage(index);
    };

    const imagePreview = images[selectedImage]?.url.startsWith("http") ? `${images?.[0]?.url}` : `${STRAPI_URL}${images?.[0]?.url}` || "/placeholder.png"

    return (
        <div className="flex flex-col gap-6">
            <div className="aspect-4/5 md:aspect-3/4 rounded-[2.5rem] overflow-hidden shadow-2xl bg-bg-dark border border-border/50 group relative">
                <ViewTransition name={`producto-${slug}`}>
                    <img
                        key={selectedImage}
                        src={imagePreview}
                        alt={name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 animate-in fade-in zoom-in-95"
                    />
                </ViewTransition>
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {images.length > 1 && (
                <div className="px-12 relative group/carousel">
                    <Carousel
                        plugins={[
                            Autoplay({
                                delay: 5000,
                                stopOnInteraction: true,
                            })
                        ]}
                        opts={{
                            align: 'start',
                            loop: images.length > 4
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {images.map(({ id, url }, index) => (
                                <CarouselItem key={id} className="pl-4 basis-1/4 sm:basis-1/5">
                                    <div
                                        onClick={() => handleImageChange(index)}
                                        className={`aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border-2 group
                                            ${selectedImage === index
                                                ? "border-accent shadow-md scale-95"
                                                : "border-transparent hover:border-accent/40 opacity-70 hover:opacity-100"
                                            }`}
                                    >
                                        <img
                                            src={`${url.startsWith("http")
                                                ? url
                                                : `${STRAPI_URL}${url}`}`}
                                            loading="lazy"
                                            title={name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {images.length > 4 && (
                            <>
                                <CarouselPrevious className="absolute -left-10 h-10 w-10 rounded-xl bg-white/90 border-border text-text-dark hover:bg-accent hover:text-white transition-all shadow-md" />
                                <CarouselNext className="absolute -right-10 h-10 w-10 rounded-xl bg-white/90 border-border text-text-dark hover:bg-accent hover:text-white transition-all shadow-md" />
                            </>
                        )}
                    </Carousel>
                </div>
            )}
        </div>
    )
}