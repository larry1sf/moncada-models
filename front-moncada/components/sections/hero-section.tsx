"use client";

import Link from "next/link";
import { IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
    return (
        <section className="relative py-12 px-8 overflow-hidden flex items-center">
            <div className="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-24 items-center relative z-10 w-full">
                {/* Content */}
                <article className="flex flex-col gap-6 md:gap-8 opacity-0 animate-[slideUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards]">

                    <Badge className="inline-block px-5 py-2.5 hover:bg-text-dark bg-text-dark text-white rounded-md text-[0.7rem] md:text-[0.8rem] font-semibold tracking-[0.15em] uppercase w-fit font-sans">
                        Nueva Colección 2026
                    </Badge>

                    <h1 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.1] text-text-dark font-bold tracking-[-0.03em]">
                        Elegancia en <span className="text-accent italic font-normal">Cada Detalle</span>
                    </h1>

                    <p className="text-lg md:text-xl leading-relaxed text-text-medium max-w-135 font-light font-sans">
                        Descubre nuestra colección de blusas diseñadas para la mujer moderna.
                        Tejidos premium, cortes exclusivos y ese toque de sofisticación que buscas para tu día a día.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-4">
                        <Button asChild variant="default" className="px-12 w-full sm:w-auto">
                            <Link href="/productos">
                                Comprar Ahora
                            </Link>
                        </Button>
                        <Button asChild variant="secondary" className="px-12 w-full sm:w-auto">
                            <Link href="#novedades">
                                Ver Novedades
                            </Link>
                        </Button>
                    </div>

                    <ul className="flex flex-wrap gap-4 md:gap-8 mt-4 md:mt-10 pt-6 md:pt-8 border-t border-accent/20">
                        <li className="flex items-center gap-2 text-text-dark font-medium text-xs md:text-sm">
                            <span className="text-accent font-bold"><IconCheck className="w-4 h-4" /></span>
                            <span>Envíos Gratis</span>
                        </li>
                        <li className="flex items-center gap-2 text-text-dark font-medium text-xs md:text-sm">
                            <span className="text-accent font-bold"><IconCheck className="w-4 h-4" /></span>
                            <span>Calidad Premium</span>
                        </li>
                        <li className="flex items-center gap-2 text-text-dark font-medium text-xs md:text-sm">
                            <span className="text-accent font-bold"><IconCheck className="w-4 h-4" /></span>
                            <span>Respuesta Rápida</span>
                        </li>
                    </ul>
                </article>

                {/* Visual */}
                <article className="relative flex justify-center opacity-0 animate-[fadeIn_1.2s_ease-out_0.2s_forwards]">
                    <div className="relative w-full max-w-125">
                        <div className="relative z-10 shadow-xs rounded-4xl overflow-hidden aspect-3/4 bg-bg-dark">
                            <img
                                src="/hero-fashion.webp"
                                alt="Blusa elegante de nueva colección"
                                className="w-full h-full object-cover "
                                width="600"
                                height="800"
                            />
                        </div>

                        <div className="absolute bottom-4 md:bottom-10 -left-4 md:-left-8 bg-white/90 backdrop-blur-md p-4 md:p-6 z-20 shadow-lg rounded-2xl flex flex-col items-center min-w-28 md:min-w-35 animate-[float_4s_ease-in-out_infinite]">
                            <span className="text-[0.7rem] md:text-[0.8rem] text-text-medium uppercase tracking-widest mb-1">Desde</span>
                            <span className="font-display text-2xl md:text-3xl font-bold text-text-dark">$29.99</span>
                            <span className="text-[10px] md:text-xs text-accent font-semibold mt-1">COP</span>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
