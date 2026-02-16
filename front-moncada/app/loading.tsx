import Spinner from "@/components/ui/spinner";

export default function Loading() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center overflow-hidden">
            {/* Background pattern matching Hero */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[6rem_4rem]">
                <div className="absolute inset-0 bg-radial-gradient from-white/20 to-white" />
            </div>

            <div className="flex flex-col items-center space-y-8">
                <Spinner size="size-20" />

                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-1000">
                    <h2 className="text-2xl font-bold tracking-tight">
                        <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Moncada Models
                        </span>
                    </h2>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-[0.3em] font-medium ml-1">
                            Cargando
                        </span>
                        <span className="flex space-x-1">
                            <span className="size-1 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]" />
                            <span className="size-1 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.15s]" />
                            <span className="size-1 rounded-full bg-primary/40 animate-bounce" />
                        </span>
                    </div>
                </div>
            </div>

            {/* Subtle bottom detail */}
            <div className="absolute bottom-12 flex flex-col items-center space-y-2 opacity-50">
                <div className="h-px w-12 bg-linear-to-r from-transparent via-primary/30 to-transparent" />
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Elegancia en cada detalle</p>
            </div>
        </div>
    )
}
