import { SOCIAL_MEDIA_LINKS } from "@/lib/const";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ContactCTA() {
    return (
        <section className="bg-bg-light py-20 px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-3xl md:text-4xl text-text-dark font-bold mb-6">¿Prefieres atención inmediata?</h2>
                <p className="text-text-medium mb-10 max-w-xl mx-auto italic font-sans font-light">
                    Nuestros expertos están listos para asistirte por WhatsApp en tiempo real para una experiencia de compra fluida.
                </p>
                <Button asChild variant="secondary">
                    <Link
                        href={SOCIAL_MEDIA_LINKS.WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"

                    >
                        Iniciar Chat en WhatsApp
                    </Link>
                </Button>
            </div>
        </section>
    );
}
