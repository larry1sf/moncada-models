import { getCategorias } from "@/service/get-categorias";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      page,
      itemsPerPage,
      whitProducts,
      sortBy,
      searchQuery,
      onlyProductCount,
      slugCategory,
    } = body;
    const { data, meta } = await getCategorias({
      page,
      itemsPerPage,
      whitProducts,
      sortBy,
      searchQuery,
      onlyProductCount,
      excludeCategory: slugCategory,
    });

    return NextResponse.json({ data, meta });
  } catch (error) {
    console.error("Error en API route de productos:", error);
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 },
    );
  }
}
