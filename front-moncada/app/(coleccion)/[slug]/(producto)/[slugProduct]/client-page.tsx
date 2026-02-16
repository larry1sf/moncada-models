"use client";
import { useState } from "react";
import {
  IconMinus,
  IconPlus,
  IconShoppingCart,
  IconBolt,
  IconTruckDelivery,
  IconPackage,
  IconRuler2,
} from "@tabler/icons-react";
import { Producto } from "@/types/typos";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GAMA_COLORES } from "@/lib/colores";
import { useCarrito } from "@/context/carrito-context";
import { toast } from "sonner";
import { SOCIAL_MEDIA_LINKS } from "@/lib/const";

export default function ClientPage({ size, color, name, price, images, id }: Producto) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const { carrito, setCarrito, openCart } = useCarrito()

  const validation = () => {
    if (!selectedColor) {
      toast.error("Por favor, seleccione un color", {
        action: {
          label: "Seleccionar",
          onClick: () => setSelectedColor(color[0])
        }
      });
      return false
    }
    if (!selectedSize) {
      toast.error("Por favor, seleccione una talla", {
        action: {
          label: "Seleccionar",
          onClick: () => setSelectedSize(size[0])
        }
      });
      return false
    }
    return true
  }

  const handleAddToCart = async () => {
    if (!validation()) return

    const product = {
      size: selectedSize,
      color: selectedColor,
      image: images[0].url,
      id,
      name,
      price,
      quantity,
    };
    toast.success("Producto agregado al carrito", {
      action: {
        label: "Ver carrito",
        onClick: openCart
      }
    })
    setCarrito((prev) => {
      if (!prev) return prev

      const existingItem = prev.find(
        (item) => item.id === id && item.size === product.size && item.color === product.color
      )

      if (existingItem)
        return prev.map((item) =>
          item === existingItem ? { ...item, quantity: item.quantity + product.quantity } : item
        )

      return [...prev, product]
    });
  };

  function handleBuyProduct() {
    if (!validation()) return

    if (carrito?.length) {
      openCart()
      return
    }
    const text = encodeURIComponent(
      `Hola, me gustaría hacer un pedido del siguiente producto: \n- *${name}* de color *${selectedColor}* y talla *${selectedSize.toUpperCase()}* que se publico con el precio de: *${price}*\n
      ${price > 100000 ? "*Debido a que el precio supera los 100.000 COP el envio es gratis*" : ""}`
    )
    window.open(`${SOCIAL_MEDIA_LINKS.WHATSAPP}?text=${text}`, "_blank", "noopener no referrer");
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Trust Badges / Promo Messages */}
      <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider text-text-medium border-y border-border py-6">
        <p className="flex items-center gap-2">
          <IconTruckDelivery className="w-4 h-4" />
          Envío gratis desde $100mil
        </p>
        <p className="flex items-center gap-2">
          <IconPackage className="w-4 h-4" />
          Pago contra entrega disponible
        </p>
      </div>

      {/* Colors */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-text-dark tracking-wide uppercase text-xs">
            Color:{" "}
            <span className="text-text-medium normal-case font-medium ml-1">
              {selectedColor || "Seleccionar"}
            </span>
          </h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {color?.map((c) => {
            return (
              <button
                type="button"
                key={c}
                onClick={() => setSelectedColor(c)}
                title={c}
                className={cn(
                  "w-10 h-10 cursor-pointer rounded-full border-2 transition-all duration-250 flex items-center justify-center p-0.5",
                  selectedColor === c
                    ? "border-accent scale-110 shadow-md"
                    : "border-border hover:border-accent/40",
                )}
              >
                <span
                  className="w-full h-full rounded-full shadow-inner"
                  style={{ backgroundColor: GAMA_COLORES[c?.toLowerCase() as keyof typeof GAMA_COLORES] }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-text-dark tracking-wide uppercase text-xs">
            Tallas Disponibles
          </h3>
          <Dialog>
            <DialogTrigger asChild>
              <button className="cursor-pointer flex items-center gap-1.5 text-xs font-bold text-accent hover:underline decoration-2 underline-offset-4">
                <IconRuler2 className="w-4 h-4" />
                Guía de tallas
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold">
                  Guía de Tallas
                </DialogTitle>
              </DialogHeader>
              <Table />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-wrap gap-3">
          {size?.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setSelectedSize(s)}
              className={cn(
                "cursor-pointer min-w-14 h-14 flex items-center justify-center rounded-2xl font-bold transition-custom border-2 text-sm",
                selectedSize === s
                  ? "bg-accent border-accent text-white shadow-lg shadow-accent/20 -translate-y-1"
                  : "bg-white border-border text-text-dark hover:border-accent/40",
              )}
            >
              {s?.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 pt-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            variant="outline"
            className="flex items-center justify-center sm:justify-start bg-white hover:bg-white hover:border-accent rounded-2xl border-2 border-border p-1.5 shadow-sm"
          >
            <div className="flex items-center gap-0">
              <div
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="cursor-pointer w-11 h-11 flex items-center justify-center rounded-xl hover:bg-bg-dark text-text-dark transition-colors"
                role="button"
                tabIndex={0}
              >
                <IconMinus className="w-5 h-5" />
              </div>
              <span className="w-12 text-center font-bold text-lg text-text-dark">
                {quantity}
              </span>
              <div
                onClick={() => setQuantity(quantity + 1)}
                className="cursor-pointer w-11 h-11 flex items-center justify-center rounded-xl hover:bg-bg-dark text-text-dark transition-colors"
                role="button"
                tabIndex={0}
              >
                <IconPlus className="w-5 h-5" />
              </div>
            </div>
          </Button>
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="flex-1 flex items-center justify-center gap-3 bg-white hover:bg-white hover:text-text-dark text-text-dark border-2 border-border rounded-2xl font-bold hover:border-accent hover:shadow-xl transition-custom active:scale-95 group p-4"
          >
            <IconShoppingCart className="w-5 h-5 transition-custom group-hover:scale-110" />
            Añadir al Carrito
          </Button>
        </div>
        <Button
          onClick={handleBuyProduct}
          variant="default"
          className="w-full text-sm flex items-center justify-center gap-3  text-white rounded-2xl py-6 font-bold shadow-2xl shadow-cta-dark/20 hover:bg-cta-dark-hover transition-custom hover:-translate-y-1 active:scale-[0.98]"
        >
          <IconBolt className="w-5 h-5 fill-current animate-pulse" />
          Comprar ahora
        </Button>
      </div>
    </div>
  );
}

export function Table() {
  return (
    <div className="py-6">
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-bg-dark border-b border-border">
            <tr>
              <th className="px-6 py-4 font-bold text-text-dark uppercase tracking-wider text-left">
                Talla
              </th>
              <th className="px-6 py-4 font-bold text-text-dark uppercase tracking-wider text-center">
                Pecho (cm)
              </th>
              <th className="px-6 py-4 font-bold text-text-dark uppercase tracking-wider text-center">
                Largo (cm)
              </th>
              <th className="px-6 py-4 font-bold text-text-dark uppercase tracking-wider text-center">
                Manga (cm)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { t: "S", p: "90-95", l: "68", m: "20" },
              { t: "M", p: "96-101", l: "70", m: "21" },
              { t: "L", p: "102-107", l: "72", m: "22" },
              { t: "XL", p: "108-113", l: "74", m: "23" },
              { t: "XXL", p: "114-119", l: "76", m: "24" },
            ].map((row) => (
              <tr
                key={row.t}
                className="hover:bg-accent/5 transition-colors"
              >
                <td className="px-6 py-4 font-bold text-text-dark text-left">
                  {row.t}
                </td>
                <td className="px-6 py-4 text-text-medium text-center">
                  {row.p}
                </td>
                <td className="px-6 py-4 text-text-medium text-center">
                  {row.l}
                </td>
                <td className="px-6 py-4 text-text-medium text-center">
                  {row.m}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-xs text-text-medium italic leading-relaxed">
        * Medidas reales basadas en estándares internacionales. Las
        dimensiones pueden variar +/- 2cm según el modelo.
      </p>
    </div>
  )
}