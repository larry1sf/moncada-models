import type { ProductAttributes, StrapiResponse } from "~/types/product"
import { gets } from "~/services/consts"
export async function getProducts(): Promise<StrapiResponse<ProductAttributes>> {
    return await gets({
        query: '/api/products?fields[0]=slug&fields[1]=name&fields[2]=description&fields[3]=price&fields[4]=isActive&fields[5]=size&fields[6]=color&fields[7]=texture&populate[images][fields][0]=url&populate[product_category][fields]=slug'
    })
}