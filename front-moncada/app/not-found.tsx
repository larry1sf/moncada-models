import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IconHome } from "@tabler/icons-react"

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center overflow-hidden">
            {/* Background pattern matching Hero */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[6rem_4rem]">
                <div className="absolute inset-0 bg-radial-gradient from-white/20 to-white" />
            </div>

            <div className="space-y-8 max-w-lg animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary/60">Error</p>
                    <h1 className="text-8xl md:text-9xl font-extrabold tracking-tighter">
                        <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">404</span>
                    </h1>
                </div>

                <div className="space-y-3">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">Vaya, parece que te has perdido</h2>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto text-balance">
                        La página que buscas no existe o ha sido movida a un lugar más exclusivo.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild>
                        <Link href="/">
                            <IconHome className="mr-2" />
                            Volver al Inicio
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
