import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
    {
        variants: {
            variant: {
                default:
                    "bg-text-dark text-accent shadow-xl border border-accent/10 hover:bg-text-dark hover:shadow-accent/20 hover:-translate-y-1",
                secondary:
                    "bg-accent text-white shadow-xl border border-accent-hover hover:bg-accent-hover hover:shadow-accent/30 hover:-translate-y-1",
                outline:
                    "border-2 border-accent text-text-dark bg-transparent hover:bg-accent hover:text-white hover:shadow-lg",
                ghost:
                    "text-text-dark hover:bg-accent/5 hover:text-accent",
                link:
                    "text-accent underline-offset-4 hover:underline",
            },
            size: {
                default: "h-14 px-8",
                sm: "h-10 px-6 text-[9px]",
                lg: "h-16 px-10 text-[11px]",
                icon: "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
