import { Skeleton } from "@/components/ui/skeleton/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CardSkeletonProps {
    variant?: "product" | "category"
    className?: string
}

export function CardSkeleton({ variant = "product", className }: CardSkeletonProps) {
    if (variant === "category") {
        return (
            <div
                className={cn(
                    "relative rounded-[2.5rem] overflow-hidden border border-accent/10 h-112 w-full bg-accent/5 flex flex-col",
                    className
                )}
            >
                <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <Skeleton className="h-10 w-3/4 mb-4 bg-white/20" />
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <Skeleton className="h-4 w-1/3 bg-white/10" />
                        <Skeleton className="w-12 h-12 rounded-full bg-white/10" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Card className={cn("h-full w-full overflow-hidden border-none shadow-md py-0", className)}>
            <div className="relative aspect-3/4 overflow-hidden bg-muted">
                <Skeleton className="bg-zinc-200 size-full" />
            </div>

            <CardHeader className="p-4 pb-2">
                <Skeleton className="bg-zinc-200 h-6 w-3/4" />
            </CardHeader>

            <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                    <Skeleton className="bg-zinc-200 h-4 w-full" />
                    <Skeleton className="bg-zinc-200 h-4 w-5/6" />
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
                <Skeleton className="bg-zinc-200 h-6 w-20" />
                <Skeleton className="bg-zinc-200 h-8 w-16 rounded-md" />
            </CardFooter>
        </Card>
    )
}
