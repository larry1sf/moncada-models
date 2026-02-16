"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
    SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { IconShoppingCart, IconTrash, IconPlus, IconMinus, IconArrowRight, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { CarritoContextValue, useCarrito } from "@/context/carrito-context";
import { STRAPI_URL } from "@/lib/const";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    DialogHeader,
    DialogFooter
} from "@/components/ui/dialog";

export function CartSheet() {
    // State from Context
    const { carrito, updateQuantity, setCarrito, isCartOpen, setIsCartOpen } = useCarrito()

    // Helper to calculate total
    const total = (carrito?.reduce((acc, item) => acc + (item.price * item.quantity), 0) ?? 0);

    // Helper to add o remove quantity of items
    const handleUpdateQuantity = (item: CarritoContextValue, quantity: number) => {
        if (quantity === 0) return
        updateQuantity(quantity, item);
    };

    // Helper to remove item from cart
    const handleRemoveItem = (item: CarritoContextValue) => {
        setCarrito((prev) => {
            if (!prev) return prev;
            return prev.filter(
                (i) =>
                    i.id !== item.id ||
                    i.size !== item.size ||
                    i.color !== item.color
            );
        });
    };

    // Helper to open whatsapp
    function handleTramitarPedido() {
        const text = encodeURIComponent(
            `Hola, me gustaría hacer un pedido de los siguientes productos:\n${carrito?.map((item) =>
                `- ${item.quantity > 1 ? `${item.quantity}: ` : ''}*${item.name}* de color *${item.color}* y talla *${item.size.toUpperCase()}* que se publico con el precio de: *${item.price}* ${item.quantity > 1 ? "cada uno" : ""}`
            ).join("\n")}\n ${(carrito?.reduce((acc, item) => acc + item.price * item.quantity, 0) ?? 0) > 100000 ? "\n*Debido a que el pedido supera los 100.000 COP el envio es gratis*" : ""}`
        )
        window.open(`https://wa.me/573024512965?text=${text}`, "_blank", "noopener no referrer");

    }

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
                <button className="relative p-2.5 rounded-xl border border-accent/20 text-text-dark hover:bg-accent/5 hover:border-accent hover:text-accent transition-custom group">
                    <IconShoppingCart className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-linear-to-br from-accent to-accent-hover text-white text-[0.65rem] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm group-hover:scale-110 transition-custom">
                        {carrito?.length}
                    </span>
                </button>
            </SheetTrigger>
            <SheetContent className="flex flex-col h-full z-200 sm:max-w-md w-full border-l border-accent/10 shadow-2xl bg-bg-light/95 backdrop-blur-md p-0 gap-0">
                <SheetHeader className="px-6 py-5 border-b border-accent/10 bg-white/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-xl font-display font-bold text-text-dark flex items-center gap-2">
                            Tu Carrito
                            <span className="text-xs font-sans font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                                {carrito?.length ?? 0} {carrito?.length === 1 ? 'item' : 'items'}
                            </span>
                        </SheetTitle>
                        <SheetDescription className="hidden">
                            Esta es tu carrito de compras en donde veras todo lo que tienes agregado para tu compra
                        </SheetDescription>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto w-full">
                    {carrito?.length === 0 ? (
                        <SheetFooter className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full scale-150 opacity-20 animate-pulse-glow" />
                                <div className="relative w-24 h-24 bg-white rounded-full border border-accent/10 flex items-center justify-center shadow-lg shadow-accent/5">
                                    <IconShoppingCart className="w-10 h-10 text-accent/60" stroke={1.5} />
                                </div>
                            </div>

                            <div className="space-y-2 max-w-[260px]">
                                <h3 className="text-lg font-bold text-text-dark font-display">Tu carrito está vacío</h3>
                                <p className="text-sm text-text-medium leading-relaxed">
                                    Parece que aún no has encontrado tu estilo ideal. Explora nuestra colección exclusiva.
                                </p>
                            </div>

                            <SheetClose asChild>
                                <Button asChild className="w-full rounded-xl bg-text-dark text-white hover:bg-accent transition-custom h-11 shadow-lg shadow-text-dark/10">
                                    <Link href="/productos" className="w-full max-w-[200px]">
                                        Explorar Colección
                                    </Link>
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    ) : (
                        <div className="p-6 space-y-6">
                            {carrito?.map((item, index) => (
                                <div key={`${item.name}-${index}`} className="group relative flex gap-4 bg-white p-3 rounded-2xl border border-accent/10 shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300">
                                    <div className="relative aspect-square w-24 overflow-hidden rounded-xl bg-accent/5">
                                        <img
                                            src={item.image?.startsWith("http")
                                                ? item.image
                                                : `${STRAPI_URL}${item.image}`}
                                            alt={item.name}
                                            className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between py-1">
                                        <div className="space-y-1">
                                            <div className="flex justify-between items-start gap-2">
                                                <h4 className="font-medium text-text-dark text-sm leading-tight line-clamp-2">
                                                    {item.name}
                                                </h4>
                                                <DialogButton handleRemoveItem={() => handleRemoveItem(item)} item={item}>
                                                    <button
                                                        //onClick={() => handleRemoveItem(item)} 
                                                        className="text-text-medium/50 hover:text-red-500 transition-colors p-1 -mr-1">
                                                        <IconTrash className="w-4 h-4" />
                                                    </button>
                                                </DialogButton>

                                            </div>
                                            <p className="text-xs text-text-medium font-medium">
                                                color: {item.color}{" "}
                                            </p>
                                            <p className="text-xs text-text-medium font-medium">
                                                talla: {item.size}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <span className="font-bold text-text-dark">
                                                ${item.price.toFixed(2)}
                                            </span>
                                            <div className="flex items-center gap-3 bg-bg-light rounded-lg p-1 border border-accent/10">
                                                <button onClick={() => handleUpdateQuantity(item, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center rounded-md bg-white text-text-dark shadow-sm hover:text-accent disabled:opacity-50">
                                                    <IconMinus className="w-3 h-3" />
                                                </button>
                                                <span className="text-xs font-semibold tabular-nums w-3 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button onClick={() => handleUpdateQuantity(item, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center rounded-md bg-white text-text-dark shadow-sm hover:text-accent">
                                                    <IconPlus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {carrito && carrito.length > 0 && (
                    <SheetFooter className="p-6 bg-white/80 backdrop-blur-md border-t border-accent/10 space-y-4">
                        <div className="space-y-2.5">
                            <div className="flex justify-between text-sm text-text-medium">
                                <span>Subtotal</span>
                                <span className="font-medium font-mono">${total?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-text-medium">
                                <span>Envío</span>
                                <span className="text-accent font-medium text-xs">Calculado el pedido</span>
                            </div>
                            <div className="flex justify-between items-end pt-2 border-t border-dashed border-accent/20">
                                <span className="text-base font-bold text-text-dark font-display">Total</span>
                                <span className="text-xl font-bold text-text-dark font-mono">${total?.toFixed(2)}</span>
                            </div>
                        </div>
                        <Button className="w-full h-12 text-base rounded-xl font-bold tracking-wide bg-linear-to-r from-accent to-accent-hover text-white shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            onClick={handleTramitarPedido}>
                            Tramitar Pedido
                            <IconArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <p className="text-xs text-center text-text-medium">
                            los envios los realizamos en bucaramanga, Colombia
                        </p>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}
function DialogButton({ children, handleRemoveItem, item }: { children: React.ReactNode, handleRemoveItem: (item: CarritoContextValue) => void, item: CarritoContextValue }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="space-y-3 py-3">
                    <DialogTitle className="font-display font-bold text-xl text-text-dark">Eliminar {item.name}</DialogTitle>
                    <DialogDescription className="text-text-medium text-base">
                        ¿Estás seguro de eliminar este producto del carrito?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button onClick={
                            (e) => {
                                e.stopPropagation();
                                handleRemoveItem(item)
                            }
                        }>Eliminar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}