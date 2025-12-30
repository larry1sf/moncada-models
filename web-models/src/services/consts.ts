import type { ProductAttributes, StrapiResponse } from "~/types/product"

export const STRAPI_HOST = import.meta.env.STRAPI_HOST as string
export const STRAPI_API_TOKEN = import.meta.env.STRAPI_API_TOKEN as string
export const VERCEL_HOST = import.meta.env.VERCEL_HOST as string

// Memoria caché para evitar peticiones duplicadas durante el build
const fetchCache = new Map<string, Promise<any>>();

export async function gets({ query }: { query: string }): Promise<StrapiResponse<ProductAttributes>> {
    let url = `${STRAPI_HOST}${query}`

    // Si ya existe una promesa para esta URL, la devolvemos
    if (fetchCache.has(url)) {
        return fetchCache.get(url);
    }

    const fetchPromise = (async () => {
        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${STRAPI_API_TOKEN}`
            }
        })
        if (!res.ok) {
            fetchCache.delete(url); // Eliminar si falla para permitir reintentos
            throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
        }
        return await res.json() as StrapiResponse<ProductAttributes>;
    })();

    fetchCache.set(url, fetchPromise);
    return fetchPromise;
}

export async function posts({ query, body }: { query: string, body: any }) {
    let url = `${STRAPI_HOST}${query}`

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${STRAPI_API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    return await res.json()
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
