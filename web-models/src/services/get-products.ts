import { STRAPI_HOST, STRAPI_API_TOKEN } from "~/services/consts"
export async function getProducts() {
    let url = `${STRAPI_HOST}/api/products?fields[0]=slug&fields[1]=name&fields[2]=description&fields[3]=price&fields[4]=isActive&fields[5]=size&fields[6]=color&fields[7]=texture&populate[images][fields][0]=url&populate[product_category][fields]=slug`

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