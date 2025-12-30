import { getCategories } from "~/services/get-categories";
import { products } from "~/data/products";
const cate = await getCategories();

export type Category = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  productCount: number;
  image: {
    id: number;
    documentId: string;
    url: string;
  };
};

export const categories: Category[] = cate.data.map((category: any) => ({
  ...category,
  productCount: products.filter(
    (product: any) => product.product_category?.slug === category.slug
  ).length,
}));
