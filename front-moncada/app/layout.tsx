import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/header";
import Footer from "@/app/footer";
import { Toaster } from "@/components/ui/sonner"
import ProductosContextProvider from "@/context/productos-context";
import CarritoContextProvider from "@/context/carrito-context";
import { getProductos } from "@/service/get-producto";
import { Producto } from "@/types/typos";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Elegancia en Cada Detalle | Moncada Models",
  description: "Descubre la mejor tienda de ropa de Bucaramanga. Desde ropa elegante hasta deportiva, con variedad en tallas y colores.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Petición inicial: obtener TODOS los productos sin filtros
  const { data: allProducts, meta: allProductsMeta } = await getProductos({
    itemsPerPage: 1000 // Obtener todos los productos disponibles
  });

  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <Toaster />
        <ProductosContextProvider 
          initialData={allProducts as Producto[] || undefined} 
          initialMeta={allProductsMeta?.pagination}
        >
          <CarritoContextProvider>
            <Header />
            <main className="max-w-7xl mx-auto px-4 md:px-8 min-h-screen">
              {children}
            </main>
          </CarritoContextProvider>
        </ProductosContextProvider>
        <Footer />
      </body>
    </html>
  )
}
