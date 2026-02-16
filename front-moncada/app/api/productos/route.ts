import { NextRequest, NextResponse } from "next/server"
import { getProductos } from "@/service/get-producto"

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body = await request.json()
        const { page, itemsPerPage, slugCategory, gender, clothingType, sort, search } = body
        const { data, meta } = await getProductos({
            page,
            itemsPerPage,
            filterForCategory: slugCategory,
            gender,
            clothingType,
            sort,
            search
        })
        return NextResponse.json({ data, meta }, { status: 200 })
    } catch (error) {
        console.error("Error en API route de productos:", error)
        return NextResponse.json(
            {
                data: null,
                error: "Error al obtener productos"
            },
            { status: 500 }
        )
    }
}
