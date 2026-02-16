import { JSX } from "react"

export interface Producto {
    id: number
    documentId: string
    slug: string
    name: string
    gender: string
    clothing_type: string
    description: string
    price: number
    isActive: boolean
    size: string[] | ["unica"]
    color: string[]
    texture: string | null
    images: Image[]
    product_category: ProductCategory
}

export interface Image {
    id: number
    documentId: string
    url: string
}

export interface ProductCategory {
    id: number
    documentId: string
    title: string
    description: string
    slug: string
    image: Image
    products?: Producto[]
}


export interface TSort {
    NOMBRE_ASC: "name-asc",
    NOMBRE_DESC: "name-desc",
    MAS_POPULAR: "products-desc"
}

export type TSortOption = TSort["NOMBRE_ASC"] | TSort["NOMBRE_DESC"] | TSort["MAS_POPULAR"];

export interface responseMetaApi {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number
    }
}

export interface responseApi {
    data: (Producto | ProductCategory)[] | null;
    meta: responseMetaApi | null;
}

export interface CategoryHeader {
    slug: string;
    title: string;
    productCount: number;
}

export type TComponentChild = (props: { outProducts?: (Producto | ProductCategory)[] }) => JSX.Element;

export type GenderOptions = { value: string, label: string }[]
