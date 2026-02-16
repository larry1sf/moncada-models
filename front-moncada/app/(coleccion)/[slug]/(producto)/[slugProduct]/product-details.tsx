"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  IconRuler2,
  IconWashDry1,
  IconInfoCircle,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconWash,
  IconWind,
  IconIroning1,
  IconRefresh,
  IconBox,
  IconCheck,
} from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SOCIAL_MEDIA_LINKS } from "@/lib/const";
interface ProductDetailsProps {
  description: string;
  productTitle?: string;
}

export default function ProductDetails({
  description,
  productTitle,
}: ProductDetailsProps) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Descripción", icon: IconInfoCircle },
    { id: "size", label: "Guía de tallas", icon: IconRuler2 },
    { id: "care", label: "Cuidados", icon: IconWashDry1 },
  ];

  return (
    <section className="w-full">
      <div className="flex border-b border-border mb-10 overflow-auto snap-x snap-mandatory no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "snap-center flex items-center gap-2.5 px-8 py-5 font-bold uppercase text-[10px] tracking-[0.2em] transition-all relative whitespace-nowrap group",
              activeTab === tab.id
                ? "text-accent "
                : "text-text-medium hover:text-text-dark cursor-pointer ",
            )}
          >
            <tab.icon
              className={cn(
                "w-4 h-4 transition-transform duration-300",
                activeTab === tab.id
                  ? "scale-110"
                  : "group-hover:scale-110 opacity-70",
              )}
            />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-accent rounded-t-full shadow-[0_-2px_8px_rgba(var(--accent-rgb),0.3)] animate-in fade-in slide-in-from-bottom-1" />
            )}
          </button>
        ))}
      </div>

      <div className="md:min-h-fit animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        {activeTab === "description" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-display font-bold text-text-dark mb-6">
                  Sobre el Producto
                </h3>
                <div className="text-base text-text-medium leading-relaxed space-y-4">
                  <p>
                    {description ||
                      "Diseñada para ofrecer el máximo confort y estilo, esta prenda se adapta a tu ritmo de vida, ya sea para entrenamientos intensos o para un look casual sofisticado."}
                  </p>
                  <p className="pt-4 border-t border-border/50">
                    En Moncada Models, cada prenda es una declaración de
                    intenciones. Fusionamos diseño contemporáneo con materiales
                    de alta calidad para crear piezas que no solo visten, sino
                    que también inspiran confianza y poder.
                  </p>
                  <p>
                    Nuestro compromiso es con la excelencia. Cada artículo pasa
                    por un riguroso control de calidad para garantizarte una
                    prenda duradera, cómoda y con un ajuste perfecto, pensada
                    para acompañarte en tu día a día.
                  </p>
                </div>
              </div>
              {/* <div className="space-y-4">
                <h4 className="font-bold text-text-dark uppercase tracking-wider text-sm">
                  Características Destacadas
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    "Diseño versátil y moderno",
                    "Libertad de movimiento total",
                    "Materiales de larga duración",
                    "Ajuste ergonómico premium",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-text-dark font-medium"
                    >
                      <div className="shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                        <IconCheck
                          className="w-3.5 h-3.5 text-accent"
                          stroke={3}
                        />
                      </div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>

            <aside className="space-y-6 lg:border-l lg:pl-8 border-border">
              <h4 className="text-lg font-bold text-text-dark flex items-center gap-2">
                ¿Necesitas Ayuda?
              </h4>
              <div className="space-y-4 text-sm text-text-medium">
                <p>
                  Si tienes dudas sobre las tallas, el envío o cualquier otro
                  detalle, nuestro equipo está listo para ayudarte.
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <Button asChild variant="secondary">
                  <Link
                    href={`${SOCIAL_MEDIA_LINKS.WHATSAPP}?text=${decodeURIComponent(`Hola! Estoy interesado en ${productTitle?.toLowerCase()}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconBrandWhatsapp />
                    Contactar por WhatsApp
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link
                    href={SOCIAL_MEDIA_LINKS.INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconBrandInstagram />
                    Contactar por Instagram
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        )}

        {activeTab === "size" && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-text-dark">
                  Encuentra tu talla ideal
                </h3>
                <p className="text-text-medium text-base mt-2">
                  Las medidas corporales vienen en centimetros(cm) para un
                  ajuste óptimo.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-bg-dark border-b border-border">
                  <tr>
                    <th className="px-8 py-5 font-bold text-text-dark uppercase tracking-wider text-left">
                      Talla
                    </th>
                    <th className="px-8 py-5 font-bold text-text-dark uppercase tracking-wider text-center">
                      Torso
                    </th>
                    <th className="px-8 py-5 font-bold text-text-dark uppercase tracking-wider text-center">
                      Cintura
                    </th>
                    <th className="px-8 py-5 font-bold text-text-dark uppercase tracking-wider text-center">
                      Largo Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { t: "S", p: "88 - 94", c: "76 - 82", l: "68" },
                    { t: "M", p: "95 - 102", c: "83 - 90", l: "70" },
                    { t: "L", p: "103 - 110", c: "91 - 98", l: "72" },
                    { t: "XL", p: "111 - 118", c: "99 - 106", l: "74" },
                    { t: "XXL", p: "119 - 126", c: "107 - 114", l: "76" },
                  ].map((row) => (
                    <tr
                      key={row.t}
                      className="hover:bg-accent/5 transition-colors group"
                    >
                      <td className="px-8 py-5 font-bold text-text-dark group-hover:text-accent transition-colors text-left">
                        {row.t}
                      </td>
                      <td className="px-8 py-5 text-text-medium text-center">
                        {row.p}
                      </td>
                      <td className="px-8 py-5 text-text-medium text-center">
                        {row.c}
                      </td>
                      <td className="px-8 py-5 text-text-medium text-center">
                        {row.l}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "care" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Lavado",
                content:
                  "Lavar a máquina con agua fría o tibia (máx. 30°C). Usar detergente suave y lavar con colores similares.",
                icon: IconWash,
              },
              {
                title: "Secado",
                content:
                  "No usar secadora. Secar al aire libre, preferiblemente a la sombra, para conservar la forma y el color.",
                icon: IconWind,
              },
              {
                title: "Planchado",
                content:
                  "Planchar a temperatura baja si es necesario. Evitar el contacto directo con estampados o aplicaciones.",
                icon: IconIroning1,
              },
              {
                title: "Cuidado general",
                content:
                  "Lavar la prenda al revés para prolongar su vida útil y mantener su apariencia original.",
                icon: IconRefresh,
              },
              {
                title: "Almacenamiento",
                content:
                  "Guardar en un lugar fresco y seco. Evitar la exposición prolongada al sol o la humedad.",
                icon: IconBox,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border border-border hover:border-accent/40 transition-all hover:shadow-xl hover:shadow-accent/5 group"
              >
                <item.icon className="w-8 h-8 text-accent mb-6 transition-transform group-hover:scale-110" />
                <h4 className="font-bold text-text-dark uppercase text-xs tracking-[0.2em] mb-3">
                  {item.title}
                </h4>
                <p className="text-text-medium text-sm leading-relaxed font-light">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
