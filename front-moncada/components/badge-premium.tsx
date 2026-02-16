import { Badge } from "@/components/ui/badge";

export default function BadgePremium({ children, color }: { children: React.ReactElement, color: "dark" | "light" }) {
    const classTheme = color === "light"
        ? "bg-white group cursor-default hover:bg-white text-text-dark space-x-2 md:space-x-4 text-sm md:text-base whitespace-nowrap"
        : "hover:bg-text-dark inline-flex items-center gap-3 bg-text-dark text-accent text-xs font-black uppercase tracking-[0.3em] animate-fade-in-up"

    return (
        <Badge className={`border border-accent/40 shadow-lg px-8 py-3 rounded-full ${classTheme}`}>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full shadow-[0_0_8px_#C4A47A] animate-pulse" />
            {children}
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full shadow-[0_0_8px_#C4A47A] animate-pulse" />
        </Badge>
    )
}