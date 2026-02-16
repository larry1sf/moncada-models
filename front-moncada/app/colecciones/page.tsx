import CategoriasList from "@/app/colecciones/categorias-list";
import { Badge } from "@/components/ui/badge";
import BadgePremium from "@/components/badge-premium";

export const metadata = {
    title: "Colecciones Exclusivas | Moncada Models",
    description: "Explora nuestras colecciones exclusivas. Moda premium diseñada para resaltar tu elegancia en cada ocasión.",
    openGraph: {
        title: "Colecciones Exclusivas | Moncada Models",
        description: "Moda premium diseñada para resaltar tu elegancia.",
    }
};

export default function CollectionsPage() {
    return (
        <div className="py-16 flex flex-col gap-12 relative">
            {/* Hero Header - Renders immediately */}
            <section className="relative px-4 md:px-8">
                <article className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="animate-fade-in">
                        <BadgePremium color="dark">
                            <span className="text-xs font-black uppercase tracking-[0.3em]">Curaduría de Moda Premium</span>
                        </BadgePremium>
                    </div>

                    <h1 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-black text-text-dark tracking-tighter leading-[0.9] animate-fade-in-up">
                        Nuestras <span className="italic text-accent">Colecciones</span>
                    </h1>

                    <p className="text-lg md:text-xl text-text-medium max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Cada colección es una narrativa de estilo, confeccionada para quienes buscan la distinción absoluta. Descubre piezas que inspiran confianza.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        {["Telas Importadas", "Diseño Original", "Ediciones Limitadas"].map((text) => (
                            <Badge key={text} variant="outline" className="px-6 py-2 border border-accent/20 bg-accent/5 text-text-dark font-bold rounded-full hover:bg-accent/10 transition-colors">
                                {text}
                            </Badge>
                        ))}
                    </div>
                </article>
            </section>

            {/* Collections Listing - Loaded asynchronously */}
            <section className="relative px-4 md:px-8 min-h-screen">
                <article className="max-w-7xl mx-auto">
                    <CategoriasList />
                </article>
            </section>
        </div >
    );
}