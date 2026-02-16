import { Badge } from "@/components/ui/badge";

export function ContactHero() {
    return (
        <section className="relative pt-20 pb-10 px-8 text-center border-b border-accent/5">
            <article className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <Badge variant="default" className="inline-block px-5 py-2.5 hover:bg-text-dark bg-text-dark text-white rounded-md text-[0.7rem] md:text-[0.8rem] font-semibold tracking-[0.15em] uppercase w-fit font-sans mb-6">
                    Experiencia Exclusiva
                </Badge>
                <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-text-dark font-bold leading-tight mb-6">
                    Hablemos de tu <span className="text-accent italic font-light">Próximo Estilo</span>
                </h1>
                <p className="text-lg md:text-xl text-text-light font-light font-sans max-w-2xl leading-relaxed">
                    En Moncada Models, cada detalle cuenta. Estamos aquí para brindarte la asesoría de lujo que mereces para transformar tu presencia.
                </p>
            </article>
        </section>
    );
}
