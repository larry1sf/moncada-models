import { gets } from "@/lib/gets"
import { responseMetaApi } from "@/types/typos"

type apiGenders = {
    id: number,
    slug: string,
    gender: string,
    clothing_type: string
}


export const getGenderOptions = async () => {
    const response = await gets({ query: "products?fields[0]=slug&fields[1]=gender&fields[2]=clothing_type" })

    if (!response) {
        console.log("No se pudo conectar a la API - getGenderOptions")
        return { genderOptions: [], count: 0 }
    }

    const { data, meta } = response as {
        data: apiGenders[],
        meta: responseMetaApi
    }
    if (!data || !meta) {
        console.log("Error al obtener los datos de getGenderOptions")
        return { genderOptions: [], count: 0 }
    }
    const count = meta?.pagination.total

    const filteredDataForGender = data?.filter((
        item: apiGenders,
        index: number,
        self: apiGenders[]
    ) =>
        self.findIndex((t) => t.gender === item.gender) === index
    );

    const genderOptions = filteredDataForGender
        ?.map((item: apiGenders) => ({
            value: item.gender,
            label: item.gender.charAt(0).toUpperCase() + item.gender.slice(1),
        }))


    return { genderOptions, count }
}

