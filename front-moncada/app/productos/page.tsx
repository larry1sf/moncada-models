import { getCategorias } from "@/service/get-categorias";
import BadgePremium from "@/components/badge-premium";
import { Badge } from "@/components/ui/badge";
import ProductosClientPage from "@/app/productos/client-page";
import { categoriasMook } from "@/lib/mock";

export const metadata = {
    title: "Catálogo de Productos | Moncada Models",
    description: "Explora nuestra amplia gama de productos premium. Moda exclusiva para hombre, mujer y niño.",
    openGraph: {
        title: "Catálogo de Productos | Moncada Models",
        description: "Moda premium diseñada para resaltar tu elegancia en cualquier ocasión.",
    }
};

export default async function ProductosPage() {
    // Solo cargamos las categorías para los filtros
    const { data: categories } = await getCategorias({ onlyProductCount: true });
    
    return (
        <div className="py-16 flex flex-col gap-12 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
                <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-accent/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] left-[-10%] w-100 h-100 bg-accent/5 rounded-full blur-[100px]" />
            </div>

            {/* Hero Header */}
            <section className="relative px-4 md:px-8">
                <article className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="animate-fade-in">
                        <BadgePremium color="dark">
                            <span className="text-xs font-black uppercase tracking-[0.3em]">Excelencia en cada detalle</span>
                        </BadgePremium>
                    </div>

                    <h1 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-black text-text-dark tracking-tighter leading-[0.9] animate-fade-in-up">
                        Nuestro <span className="italic text-accent">Catálogo</span>
                    </h1>

                    <p className="text-lg md:text-xl text-text-medium max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Descubre una selección curada de piezas exclusivas, diseñadas para quienes no se conforman con lo ordinario. Calidad que se siente, estilo que se nota.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        {["Premium Textile", "Handcrafted", "Limited Edition"].map((text) => (
                            <Badge key={text} variant="outline" className="px-6 py-2 border border-accent/20 bg-accent/5 text-text-dark font-bold rounded-full hover:bg-accent/10 transition-colors">
                                {text}
                            </Badge>
                        ))}
                    </div>
                </article>
            </section>

            {/* Client Side Container with Filter and Grid */}
            <section className="relative px-4 md:px-8 min-h-screen">
                <article className="max-w-7xl mx-auto">
                    <ProductosClientPage
                        categories={(categories ?? categoriasMook) as any}
                    />
                </article>
            </section>
        </div>
    );
}
