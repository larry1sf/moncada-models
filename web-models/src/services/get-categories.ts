import { gets } from "~/services/consts"
export async function getCategories() {
    return await gets({
        query: "/api/product-categories?fields[0]=slug&fields[1]=title&fields[2]=description&populate[image][fields][0]=url"
    })
}