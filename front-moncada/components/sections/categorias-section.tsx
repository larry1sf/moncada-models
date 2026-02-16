import { IconChevronRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SectionCategories from "@/components/categorias/section-categories";
import SectionHeader from "@/components/sections/section-header";

export default async function CategoriasSection() {
    return (
        <section id="colecciones" className="scroll-mt-24 px-4 md:px-8">
            <SectionHeader
                title="Nuestras Colecciones"
                description="Explora nuestras categorías diseñadas para cada ocasión"
                showBadge={false}
            />

            <SectionCategories />

            <div className="flex justify-center mt-12 md:mt-16">
                <Button
                    asChild
                    variant="secondary"
                    className="group h-16  px-10"
                >
                    <Link href="/colecciones">
                        Ver <span className="hidden sm:inline">Todas las </span>Colecciones
                        <IconChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
        </section>
    )
}