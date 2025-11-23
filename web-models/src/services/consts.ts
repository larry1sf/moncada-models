import type { ProductAttributes, StrapiResponse } from "~/types/product"

export const STRAPI_HOST = import.meta.env.STRAPI_HOST as string
export const STRAPI_API_TOKEN = import.meta.env.STRAPI_API_TOKEN as string

export async function gets({ query }: { query: string }): Promise<StrapiResponse<ProductAttributes>> {
    let url = `${STRAPI_HOST}${query}`

    const res = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${STRAPI_API_TOKEN}`
        }
    })
    return await res.json() as StrapiResponse<ProductAttributes>
}
export function formatPriceCOP(price: number | string): string {
    // Convertir a string y limpiar caracteres que no sean dígitos o punto
    const cleanValue = String(price).replace(/[^0-9.]/g, "");

    // Convertir a número
    const num = Number(cleanValue);

    // Si no es número válido, devolver el original
    if (isNaN(num)) return String(price);

    // Formatear con puntos de miles al estilo colombiano
    return num.toLocaleString("es-CO");
}