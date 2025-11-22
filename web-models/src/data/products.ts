import { getProducts } from "~/services/get-products";
type StrapiImages = {
  id: number;
  documentId: string,
  url: string
}
type ProductCategory = {
  id: number;
  documentId: string;
  slug: string;
}
export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: StrapiImages[];
  isActive: boolean;
  color: string[];
  size: string[];
  texture?: string;
  product_category: ProductCategory;
};

const { data } = await getProducts()

export const products: Product[] = data