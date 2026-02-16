"use client";

import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import useMousePosition from "../hooks/useMousePosition";



export default function Newsletter() {
    const { containerRef, handleMouseMove } = useMousePosition();
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return;
        const msg = `Hola ${name} me gustaria estar al tanto de los nuevos productos y ofertas `
        window.open(
            `https://wa.me/573024512965?text=${encodeURIComponent(msg)}`,
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="group relative bg-cta-dark rounded-4xl p-8 md:p-12 lg:p-16 my-20 overflow-hidden border border-white/5 shadow-xl transition-all"
        >
            {/* Dynamic Glow Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(800px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(196,164,122,0.15),transparent_40%)]" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center">
                <div className="flex flex-col gap-4">
                    <h2 className="font-display text-3xl md:text-4xl text-cream font-bold tracking-tight">
                        Suscríbete Como Nuestro Cliente
                    </h2>
                    <p className="text-bg-light/80 text-lg font-light font-sans leading-relaxed">
                        Recibe ofertas exclusivas, tips de moda y nuevas colecciones primero. Únete a nuestra comunidad.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Tu nombre completo"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 px-6 py-4 rounded-xl bg-bg-light border border-border text-text-dark text-lg font-sans focus:outline-none focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-text-light/50"
                    />
                    <Button type="submit" variant="secondary" size="lg">
                        Contactar por WhatsApp
                    </Button>
                </form>
            </div>
        </section>
    );
}
