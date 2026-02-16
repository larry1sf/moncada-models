"use client"

import Link from "next/link";
import { socials } from "@/lib/const";
import { useState, useEffect } from "react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (!year) return null;
  return (
    <footer className="bg-cta-dark text-bg-light mt-12 sm:mt-20">
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-8 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-10">
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-2xl text-accent font-bold">
            Moncada Models
          </h3>
          <p className="text-cream/50 leading-relaxed text-sm">
            Elegancia y estilo en cada prenda. Descubre la moda que te define
            con nuestras piezas exclusivas.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-accent font-semibold text-lg">Enlaces Rápidos</h4>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href="/"
                className="text-cream/50 hover:text-accent transition-custom text-sm"
              >
                <span className="hidden md:inline">Página de </span>Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/#novedades"
                className="text-cream/50 hover:text-accent transition-custom text-sm"
              >
                <span className="hidden md:inline">Últimas </span>Novedades
              </Link>
            </li>
            <li>
              <Link
                href="/productos"
                className="text-cream/50 hover:text-accent transition-custom text-sm"
              >
                <span className="hidden md:inline">Catálogo de </span>Productos
              </Link>
            </li>
            <li>
              <Link
                href="/colecciones"
                className="text-cream/50 hover:text-accent transition-custom text-sm"
              >
                Colecciones<span className="hidden md:inline"> Exclusivas</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-accent font-semibold text-lg">Ayuda</h4>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href="/nosotros/contactanos"
                className="text-cream/50 hover:text-accent transition-custom text-sm"
              >
                <span className="hidden md:inline">Centro de </span>Contacto
              </Link>
            </li>
            <li>
              <Link
                href="/nosotros/ubicanos"
                className="text-cream/50 hover:text-accent transition-custom text-sm"
              >
                <span className="hidden md:inline">Encuentra nuestra </span>
                Ubicacion
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-accent font-semibold text-lg">Síguenos</h4>
          <div className="flex gap-4">
            {
              socials.map(social => (
                <a
                  key={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={social.url}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-cta-dark transition-all hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))
            }
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-accent/20 px-8 py-8 text-center">
        <p className="text-cream/50 text-sm">
          &copy; {year} Moncada Models. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
