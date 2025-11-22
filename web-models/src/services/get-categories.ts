import { STRAPI_HOST, STRAPI_API_TOKEN } from "~/services/consts"
export async function getCategories() {
    let url = `${STRAPI_HOST}/api/product-categories?fields[0]=slug&fields[1]=title&fields[2]=description&populate[image][fields][0]=url`

    const res = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${STRAPI_API_TOKEN}`
        }
    })
    const { data, meta } = await res.json()

    return {
        data,
        meta
    }
}