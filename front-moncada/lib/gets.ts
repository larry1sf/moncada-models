import { STRAPI_URL, STRAPI_TOKEN } from "@/lib/const"

export async function gets({ query }: { query: string }) {
    try {
        const res = await fetch(`${STRAPI_URL}/api/${query}`, {
            headers: {
                "Authorization": `Bearer ${STRAPI_TOKEN}`
            }
        })

        if (!res.ok) {
            console.error(`[GETS ERROR] Status: ${res.status} ${res.statusText}`);
            try {
                const errorBody = await res.text();
                console.error(`[GETS ERROR] Body: ${errorBody}`);
            } catch (e) {
                console.error("[GETS ERROR] No se pudo leer el body del error");
            }
            console.log("Error al obtener los datos")
            return null
        }
        return await res.json()
    } catch (error) {
        console.error("Realizar la peticion", error)
    }
    return null
}