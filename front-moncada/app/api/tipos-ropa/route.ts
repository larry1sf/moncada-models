import { getClothingTypeOptions } from "@/service/get-clothing-type"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const { clothingTypeOptions } = await getClothingTypeOptions()
        if (clothingTypeOptions.length) return NextResponse.json({ clothingTypeOptions })
        return NextResponse.json({ error: "No se encontraron tipos de ropa" }, { status: 404 })
    } catch (error) {
        console.error("Error en API route de tipos de ropa:", error)
        return NextResponse.json(
            { error: "Error al obtener tipos de ropa" },
            { status: 500 },
        )
    }
}