import { getCategories } from "~/services/get-categories";
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

export const categories: Category[] = cate.data
