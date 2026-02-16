import { gets } from "@/lib/gets"
import { responseMetaApi } from "@/types/typos"

type apiGenders = {
    id: number,
    slug: string,
    gender: string,
    clothing_type: string
}


export const getClothingTypeOptions = async () => {
    const response = await gets({ query: "products?fields[0]=slug&fields[1]=gender&fields[2]=clothing_type" })

    if (!response) {
        console.log("No se pudo conectar a la API - getClothingTypeOptions")
        return { clothingTypeOptions: [], count: 0 }
    }

    const { data, meta } = response as {
        data: apiGenders[],
        meta: responseMetaApi
    }
    if (!data || !meta) {
        console.log("Error al obtener los datos de getClothingTypeOptions")
        return { clothingTypeOptions: [], count: 0 }
    }
    const count = meta?.pagination.total

    const filteredDataForClothingType = data?.filter((
        item: apiGenders,
        index: number,
        self: apiGenders[]
    ) =>
        self.findIndex((t) => t.clothing_type === item.clothing_type) === index
    );

    const clothingTypeOptions = filteredDataForClothingType
        ?.map((item: apiGenders) => ({
            value: item.clothing_type,
            label: item.clothing_type.charAt(0).toUpperCase() + item.clothing_type.slice(1),
        }))
    return { clothingTypeOptions, count }
}

