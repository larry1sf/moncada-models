import { IconPhone, IconMapPin, IconClock, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { siteInfo, socials } from "@/lib/const";


export function ContactInfo() {
    return (
        <div className="flex flex-col gap-12 h-full justify-between font-sans">
            {/* Information Cards */}
            <section className="grid grid-cols-1 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-accent/5 shadow transition-custom group">
                    <header className="flex flex-row justify-between">
                        <div>
                            <h3 className="font-display font-bold text-text-dark mb-1">Escríbenos</h3>
                            <p className="text-text-medium text-sm mb-3">Asesoría instantánea vía WhatsApp</p>
                        </div>
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-custom">
                            <IconPhone size={24} />
                        </div>
                    </header>
                    <Link rel="noopener noreferrer" target="_blank" href={siteInfo.contact.whatsappUrl} className="text-accent font-bold text-sm flex items-center gap-2 group/link">
                        Chatear Ahora <IconChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-accent/5 shadow transition-custom group lg:col-span-1">
                    <header className="flex flex-row justify-between">
                        <div>
                            <h3 className="font-display font-bold text-text-dark mb-1">Visítanos</h3>
                            <p className="text-text-medium text-sm mb-1">{siteInfo.contact.address}</p>
                        </div>
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-custom">
                            <IconMapPin size={24} />
                        </div>
                    </header>
                    <p className="text-text-medium text-sm">{siteInfo.contact.city}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-accent/5 shadow transition-custom group">
                    <header className="flex flex-row justify-between">
                        <div>
                            <h3 className="font-display font-bold text-text-dark mb-1">Horarios</h3>
                            <p className="text-text-medium text-sm mb-1">{siteInfo.contact.hours}</p>
                        </div>
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-custom">
                            <IconClock size={24} />
                        </div>
                    </header>
                    <p className="text-accent text-[10px] font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        Disponible Ahora
                    </p>
                </div>
            </section>

            {/* Social Links */}
            <section className="bg-text-dark p-8 rounded-[2rem] text-white overflow-hidden relative shadow">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <div>
                        <h3 className="font-display font-bold text-xl mb-1 text-center sm:text-start">Nuestra Comunidad</h3>
                        <p className="text-accent text-sm opacity-80">Síguenos para lanzamientos exclusivos.</p>
                    </div>
                    <div className="flex gap-4">
                        {socials.map((social) => (
                            <Link
                                key={social.name}
                                href={social.url}
                                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-custom transform hover:-translate-y-1"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <social.icon size={24} />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            </section>
        </div>
    );
}
