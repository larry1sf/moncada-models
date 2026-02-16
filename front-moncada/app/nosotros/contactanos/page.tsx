import { Metadata } from "next";
import { ContactHero } from "./ContactHero";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import { ContactCTA } from "./ContactCTA";

export const metadata: Metadata = {
    title: "Contacto | Moncada Models",
    description: "Ponte en contacto con nosotros para asesoría personalizada en moda y tendencias. Estamos aquí para ayudarte a encontrar tu estilo ideal."
}

export default function ContactoPage() {
    return (
        <>
            <ContactHero />

            <main className="max-w-7xl mx-auto px-6 md:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <ContactForm />
                    <ContactInfo />
                </div>
            </main>

            <ContactCTA />
        </>
    );
}
