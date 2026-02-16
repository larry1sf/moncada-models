import { getGenderOptions } from "@/service/get-gender-options";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const { genderOptions, count } = await getGenderOptions()
        if (genderOptions.length) return NextResponse.json({ genderOptions, count })
        return NextResponse.json({ error: "No se encontraron generos" }, { status: 404 })
    } catch (error) {
        console.error("Error en API route de generos:", error)
        return NextResponse.json(
            { error: "Error al obtener generos" },
            { status: 500 },
        )
    }
}