import { IconPackageOff } from "@tabler/icons-react";
import React from "react";

export default function ErrorSection(
    {
        className,
        children,
        messages
    }: {
        className?: string;
        messages?: {
            title: string
            description: string
        };
        children?: React.ReactElement
    }
) {
    return (
        <div className={`flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in text-zinc-900! ${className}`}>
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <IconPackageOff className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-text-dark mb-2">{messages?.title ?? "No se encontraron productos"}</h3>
            <p className="text-text-medium max-w-sm mx-auto">
                {messages?.description ?? "Intenta ajustar tus filtros para encontrar lo que estás buscando."}
            </p>
            {children}
        </div>
    )
}