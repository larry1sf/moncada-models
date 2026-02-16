import { Accordion, AccordionTrigger, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { IconPhone, IconMail, IconMapPin, IconBrandInstagram, IconBrandFacebook, IconBrandWhatsapp, IconChevronRight } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";
import { siteInfo, socials } from "@/lib/const";

export const meta: Metadata = {
    title: "Encuentranos de facil y rapido | Moncada Models",
    description: "Somos la mejor tienda de ropa de moda, puedes buscarnos en la Cra 17 #3359, Centro, Bucaramanga, Santander"
}

export default function UbicacionPage() {
    return (
        <div className="bg-bg-light min-h-screen flex flex-col gap-20">
            {/* Hero Section */}
            <section className="relative pt-20 px-8 text-center bg-bg-light">
                <article className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    <Badge variant="default" className="inline-block px-5 py-2.5 hover:bg-text-dark bg-text-dark text-white rounded-md text-[0.7rem] md:text-[0.8rem] font-semibold tracking-[0.15em] uppercase w-fit font-sans mb-6">
                        Atención Exclusiva
                    </Badge>
                    <h1 className="font-display text-[clamp(3rem,6vw,4.5rem)] text-text-dark font-bold leading-none mb-6">
                        Hablemos de Estilo
                    </h1>
                    <p className="text-xl text-text-light font-light font-sans max-w-2xl leading-relaxed">
                        Tu elegancia es nuestra inspiración. Estamos aquí para asesorarte y brindarte una experiencia de compra inigualable.
                    </p>
                </article>
            </section>

            <section className="w-full mx-auto px-8 pb-24 flex flex-col gap-20 relative z-20">
                {/* Contact Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8">
                    <div className="bg-white p-6 md:p-12 shadow-2xl border border-accent/20 flex flex-col gap-10 rounded-2xl">
                        <header>
                            <h2 className="font-display text-3xl text-text-dark font-bold mb-2">Canales de Atención</h2>
                            <p className="text-text-medium font-sans">Elige el medio que prefieras. Siempre estamos listos para escucharte.</p>
                        </header>

                        <article className="flex flex-col gap-6">
                            <a href={`tel:${siteInfo.contact.phoneClean}`} className="group flex items-center gap-5 p-5 bg-bg-light border border-transparent hover:border-accent hover:bg-white hover:translate-x-2 rounded-xl transition-custom">
                                <div className="p-3 bg-white rounded-lg text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-custom">
                                    <IconPhone size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-display font-bold text-text-dark">Línea Directa</h3>
                                    <span className="block text-text-medium font-medium">{siteInfo.contact.phone}</span>
                                    <span className="block text-xs text-text-light opacity-80 mt-1">{siteInfo.contact.hours}</span>
                                </div>
                                <IconChevronRight size={20} className="text-accent opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-custom" />
                            </a>

                            <a href={`mailto:${siteInfo.contact.email}`} className="group flex items-center gap-5 p-5 bg-bg-light border border-transparent rounded-xl hover:border-accent hover:bg-white hover:translate-x-2 transition-custom">
                                <div className="p-3 bg-white rounded-lg text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-custom">
                                    <IconMail size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-display font-bold text-text-dark">Correo Electrónico</h3>
                                    <span className="block text-text-medium font-medium">{siteInfo.contact.email}</span>
                                    <span className="block text-xs text-text-light opacity-80 mt-1">Respuesta prioritaria</span>
                                </div>
                                <IconChevronRight size={20} className="text-accent opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                            </a>

                            <section className="flex items-center gap-5 p-5 bg-bg-light border border-transparent rounded-xl">
                                <div className="p-3 bg-white rounded-lg text-accent shadow-sm">
                                    <IconMapPin size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-display font-bold text-text-dark">Boutique Principal</h3>
                                    <span className="block text-text-medium font-medium">{siteInfo.contact.address}</span>
                                    <span className="block text-xs text-text-light opacity-80 mt-1">{siteInfo.contact.city}</span>
                                </div>
                            </section>
                        </article>

                        <footer className="pt-8 border-t border-border flex items-center justify-between">
                            <span className="text-[0.9rem] uppercase tracking-wider text-text-light font-semibold">Síguenos</span>
                            <div className="flex gap-3">
                                {socials.map(social => (
                                    <a key={social.name} title={social.name} href={social.url} className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-light text-text-medium border border-transparent hover:bg-accent hover:text-white hover:-translate-y-1 transition-custom">
                                        <social.icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </footer>
                    </div>

                    <div className="relative shadow-2xl bg-bg-light min-h-[500px] overflow-hidden group rounded-2xl">
                        <iframe
                            src={siteInfo.contact.googleMapsUrl(true)}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        <Link href={siteInfo.contact.googleMapsUrl(false)} target="_blank" rel="noopener noreferer" title="Ver en Google Maps" className="absolute bottom-8 left-8 bg-text-dark text-cream px-6 py-3 shadow-xl text-sm font-semibold rounded-2xl">Ver en Google Maps</Link>
                    </div>
                </div>

                {/* FAQ Section */}
                <section className="max-w-3xl w-full mx-auto ">
                    <header className="text-center mb-16">
                        <h2 className="font-display text-4xl text-text-dark font-bold mb-4">Preguntas Frecuentes</h2>
                        <p className="text-text-medium italic">Todo lo que necesitas saber antes de tu compra.</p>
                    </header>

                    <Accordion
                        type="single"
                        collapsible
                        defaultValue="mm_1"
                        className="flex flex-col gap-4">
                        {siteInfo.faqs.map((faq, i) => (
                            <AccordionItem
                                key={i}
                                value={`mm_${i + 1}`}
                                className="group border-b border-border-custom cursor-pointer">
                                <AccordionTrigger className="flex items-center justify-between py-6 text-xl font-medium text-text-dark group-hover:text-accent list-none">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="pb-8 text-text-light transition-custom leading-relaxed font-sans max-w-4/5">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>
            </section>
        </div>
    );
}
