"use client"

import { createContext, useContext, useEffect, useState } from "react"

export interface CarritoContextValue {
    id: number,
    name: string,
    price: number,
    quantity: number,
    image: string,
    size: string,
    color: string,
}

interface CarritoContextProvider {
    carrito: CarritoContextValue[] | null,
    setCarrito: React.Dispatch<React.SetStateAction<CarritoContextValue[] | null>>,
    updateQuantity: (quantity: number, searchItem: CarritoContextValue) => void,
    isCartOpen: boolean,
    openCart: () => void,
    closeCart: () => void,
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CarritoContext = createContext<CarritoContextProvider | null>(null)

export function useCarrito() {
    const context = useContext(CarritoContext)
    if (context === null)
        throw new Error("useCarrito debe usarse dentro de un CarritoContextProvider")

    return context
}

export default function CarritoContextProvider({ children }: { children: React.ReactNode }) {
    const [carrito, setCarrito] = useState<CarritoContextValue[] | null>([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') return

        try {
            const savedCart = localStorage.getItem("cart");
            if (savedCart) {
                setCarrito(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error("Error loading cart from localStorage:", error);
            setCarrito([]);
        }
    }, [])

    useEffect(() => {
        if (typeof window === 'undefined') return

        try {
            if (carrito && carrito.length > 0) {
                localStorage.setItem("cart", JSON.stringify(carrito));
            } else {
                localStorage.removeItem("cart");
            }
        } catch (error) {
            console.error("Error saving cart to localStorage:", error);
        }
    }, [carrito])

    const updateQuantity = (quantity: number, searchItem: CarritoContextValue) => {
        if (!carrito?.length) return

        const updatedCart = carrito.map(
            item => item.id === searchItem.id && item.size === searchItem.size && item.color === searchItem.color
                ? { ...item, quantity }
                : item
        )
        setCarrito(updatedCart);
    }

    const openCart = () => setIsCartOpen(true)
    const closeCart = () => setIsCartOpen(false)

    return (
        <CarritoContext value={{
            carrito,
            setCarrito,
            updateQuantity,
            isCartOpen,
            openCart,
            closeCart,
            setIsCartOpen
        }}>
            {children}
        </CarritoContext>
    )
}