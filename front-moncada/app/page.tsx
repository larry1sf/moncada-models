import CtaMoncadaModels from "@/components/cta-moncada-models";
import HeroSection from "@/components/sections/hero-section";
import CategoriasSection from "@/components/sections/categorias-section";
import NovedadesSection from "@/components/sections/novedades-section";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 pb-10">
      <HeroSection />
      <NovedadesSection />
      <CategoriasSection />
      <CtaMoncadaModels />
    </div>
  );
}
