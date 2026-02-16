import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/header";
import Footer from "@/app/footer";
import { Toaster } from "@/components/ui/sonner"
import CategoriasContextProvider from "@/context/categorias-context";
import ProductosContextProvider from "@/context/productos-context";
import CarritoContextProvider from "@/context/carrito-context";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <Toaster />
        <CategoriasContextProvider>
          <ProductosContextProvider>
            <CarritoContextProvider>

              <Header />
              <main className="max-w-7xl mx-auto px-4 md:px-8 min-h-screen">
                {children}
              </main>

            </CarritoContextProvider>
          </ProductosContextProvider>
        </CategoriasContextProvider>

        <Footer />

      </body>
    </html>
  )
}
