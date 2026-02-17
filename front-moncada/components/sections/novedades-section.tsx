import SectionProducts from "@/components/sections/section-products";
import SectionHeader from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";

export default function NovedadesSection() {
    return (
        <section id="novedades" className="scroll-mt-24 px-4 sm:px-8">
            <SectionHeader
                badgeContent={
                    <div>
                        Destacados <span className="text-cream underline decoration-2 underline-offset-4">Moncada</span> 2026
                    </div>
                }
                title="Novedades"
                description="Descubre las últimas tendencias en moda que acaban de llegar"
            />
            <SectionProducts itemsPerPage={6} />
             <div className="flex justify-center mb-6">
                <Button
                    asChild
                    variant="secondary"
                    className="group h-16 px-10"
                >
                    <Link href="/productos">
                        Ver<span className="hidden sm:inline">Todos los</span>Productos
                        <IconChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
        </section>
    )
}
