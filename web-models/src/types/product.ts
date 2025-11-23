export interface ProductImage {
  id: number;
  url: string;
}

export interface ProductCategory {
  id: number;
  slug: string;
}

export interface ProductAttributes {
  slug: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  size: string[] | string;
  color: string[] | string;
  texture: string;
  images: ProductImage[];
  product_category: ProductCategory;
}

export interface Product {
  id: number;
  attributes: ProductAttributes;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
