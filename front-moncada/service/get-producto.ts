import { gets } from "@/lib/gets"
import { responseApi } from "@/types/typos";

export async function getProductos({
    filterSlug = "",
    page = 1,
    itemsPerPage = 10,
    filterForCategory,
    gender,
    clothingType,
    sort = "createdAt:desc",
    extraQuery = "",
    search
}:
    {
        search?: string;
        filterSlug?: string;
        filterForCategory?: string;
        gender?: string;
        clothingType?: string;
        sort?: string;
        extraQuery?: string;
        page?: number;
        itemsPerPage?: number;
    }) {
    try {
        let filters = "";

        if (filterSlug) filters += `&filters[slug][$eq]=${filterSlug}`;
        if (filterForCategory) filters += `&filters[product_category][slug][$eq]=${filterForCategory}`;
        if (search) filters += `&filters[name][$containsi]=${search}`;
        if (gender && gender !== "all") filters += `&filters[gender][$eq]=${gender}`;
        if (clothingType && clothingType !== "all") filters += `&filters[clothing_type][$eq]=${clothingType}`;

        const querySort = `&sort[0]=${sort}`;

        const response = await gets({
            query: `products?fields[0]=slug&fields[1]=name&fields[2]=description&fields[3]=price&fields[4]=isActive&fields[5]=size&fields[6]=color&fields[7]=texture&fields[8]=gender&fields[9]=clothing_type&populate[images][fields][0]=url&populate[product_category][fields][0]=slug&populate[product_category][fields][1]=title&populate[product_category][fields][2]=description&pagination[page]=${page}&pagination[pageSize]=${itemsPerPage}${filters}${querySort}${extraQuery}`
        })

        if (!response) {
            console.error("No se pudo conectar a la API de productos")
            return { data: null, meta: null } as responseApi
        }

        const { data, meta } = response
        if (data == null) {
            console.error("No se recibieron datos de productos")
            return { data: null, meta: null } as responseApi
        }

        return { data, meta } as responseApi
    } catch (error) {
        console.error("Error al obtener los productos", error)
        return { data: null, meta: null } as responseApi
    }
}