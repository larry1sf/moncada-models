"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { toast as toastSonner } from "sonner"
interface ContactForm {
    name: string;
    whatsapp: string;
    email: string;
    message: string;
}

export function ContactForm() {

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | null }>({ message: "", type: null });


    useEffect(() => {
        if (toast.type) {
            const timer = setTimeout(() => setToast({ message: "", type: null }), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const validate = (formData: ContactForm) => {
        const newErrors: Record<string, string> = {};
        if (!formData) return setToast({ message: "Por favor, completa todos los campos", type: "error" });

        if (!formData.name.trim())
            newErrors.name = "El nombre es obligatorio";

        if (!formData.whatsapp.trim())
            newErrors.whatsapp = "El WhatsApp es obligatorio"
        if (!formData.whatsapp.trim().match(/^\d{10}$/))
            newErrors.whatsapp = "Verifique el número de WhatsApp"

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = "El correo electrónico no es válido"

        if (!formData.message.trim())
            newErrors.message = "Por favor, escribe tu pregunta";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            toastSonner.error(Object.values(newErrors)[0], {
                action: {
                    label: "cerrar",
                    onClick: () => console.log("accion de salida"),
                },
            });
            return false;
        }
        return true;
    };

    const handleForm = (e: React.FormEvent): ContactForm | null => {
        e.preventDefault();

        const form = new FormData(e.target as HTMLFormElement);
        const messageData = {
            name: form.get("name") as string,
            whatsapp: form.get("whatsapp") as string,
            email: form.get("email") as string,
            message: form.get("message") as string,
        }
        if (!validate(messageData)) return null;
        return messageData
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const messageData = handleForm(e)
        if (!messageData) return
        setStatus("loading");
        try {
            const res = await fetch("/api/contacto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(messageData),
            })
            if (!res) {
                setStatus("error");
                toastSonner.error("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
                return
            }
            const { redirectTo } = await res.json();
            setTimeout(() => { // simula el tiempo
                setStatus("success");

                setErrors({});
                toastSonner.success("¡Mensaje enviado con éxito!", {
                    action: {
                        label: "cerrar",
                        onClick: () => console.log("accion de salida"),
                    },
                })
                setTimeout(() => {
                    if (redirectTo) window.open(redirectTo, "_blank")
                }, 1000);
            }, 500);

        } catch (error) {
            setStatus("error");
            toastSonner.error("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
        } finally {
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <section className="bg-white p-8 md:p-12 rounded-[2rem] shadow border border-accent/10 relative">
            <header className="mb-10">
                <h2 className="font-display text-3xl text-text-dark font-bold mb-3">Envíenos un Mensaje</h2>
                <p className="text-text-medium font-sans">Nuestro equipo de asesores le responderá en menos de 24 horas.</p>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-text-dark/60 ml-1">Nombre Completo</label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Ej: Alejandra García"
                            className={cn(
                                "h-14 bg-bg-light/50 border-border focus:bg-white focus:border-accent transition-all duration-300 rounded-xl text-text-dark",
                                errors.name && "border-red-200"
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="whatsapp" className="text-xs font-bold uppercase tracking-widest text-text-dark/60 ml-1">WhatsApp</label>
                        <div className="flex">
                            <button type="button" className="h-14 px-4 bg-bg-light/50 border border-r-0 border-border rounded-l-xl text-text-dark/60 font-bold text-sm pointer-events-none">
                                +57
                            </button>
                            <Input
                                id="whatsapp"
                                name="whatsapp"
                                placeholder="300 000 0000"
                                className={cn(
                                    "h-14 bg-bg-light/50 border-border focus:bg-white focus:border-accent transition-all duration-300 rounded-l-none rounded-r-xl text-text-dark",
                                    errors.whatsapp && "border-red-200"
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-text-dark/60 ml-1">Correo Electrónico (Opcional)</label>
                    <Input
                        id="email"
                        name="email"
                        required={false}
                        type="email"
                        placeholder="alejandra@ejemplo.com"
                        className={cn(
                            "h-14 bg-bg-light/50 border-border focus:bg-white focus:border-accent transition-all duration-300 rounded-xl text-text-dark",
                            errors.email && "border-red-200"
                        )}
                    />
                </div>

                <div className="flex flex-col justify-end gap-2 min-h-40">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-text-dark/60 ml-1">Su Consulta</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="¿En qué podemos asesorarte hoy?"
                        style={{
                            fieldSizing: "content"
                        }}
                        className={cn(
                            "w-full h-[6.5lh] p-4 bg-bg-light/50 border-border focus:bg-white focus:border-accent transition-all duration-300 rounded-xl outline-none text-sm border shadow-sm resize-none text-text-dark",
                            errors.message && "border-red-200"
                        )}
                    />
                </div>

                <Button disabled={status === "loading"} className="h-16 group mt-4 relative overflow-hidden">
                    {status === "loading" ? (
                        <IconLoader2 className="animate-spin" />
                    ) :
                        "Enviar Mensaje"
                    }
                </Button>
            </form>
        </section>
    );
}
