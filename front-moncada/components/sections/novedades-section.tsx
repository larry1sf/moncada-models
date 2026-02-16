import SectionProducts from "@/components/sections/section-products";
import SectionHeader from "@/components/sections/section-header";

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
        </section>
    )
}
