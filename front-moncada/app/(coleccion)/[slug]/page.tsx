import { notFound } from "next/navigation";

import { getCategorias } from "@/service/get-categorias";
import { Metadata } from "next";
import ClientPage from "./client-page";

type TProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  // read route params
  const { slug } = await params;

  const { data: categorias } = await getCategorias({ filterCategory: slug });

  if (categorias === null) notFound();
  const [cate] = categorias;

  return {
    title: `${cate.title} | Moncada Models`,
    description: cate.description,
  };
}

export default async function CategoryPage({ params }: TProps) {
  const { slug } = await params;

  // Pre-cargamos SOLO la información del Hero en el servidor para una carga ultra rápida
  const { data } = await getCategorias({
    filterCategory: slug,
    onlyProductCount: true,  // No cargamos productos detallados aquí
    whitProducts: false      // Solo lo necesario para la identidad de la categoría
  });

  if (!data || data.length === 0) notFound();
  const category = data[0];

  return (
    <div className="pt-16 flex flex-col gap-16">
      <ClientPage slug={slug} initialCategory={category} />
    </div>
  );
}
