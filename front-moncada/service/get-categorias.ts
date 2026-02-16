import { gets } from "@/lib/gets";
import { ProductCategory, TSortOption, responseMetaApi } from "@/types/typos";

export async function getCategorias({
  filterCategory = "",
  whitProducts,
  onlyProductCount = false,
  itemsPerPage = 6,
  page = 1,
  searchQuery = "",
  sortBy = "name-asc",
  excludeCategory,
}: {
  filterCategory?: string;
  excludeCategory?: string;
  itemsPerPage?: number;
  page?: number;
  whitProducts?: boolean;
  onlyProductCount?: boolean;
  searchQuery?: string;
  sortBy?: TSortOption;
}) {
  try {
    let productsQuery = "";
    if (onlyProductCount) {
      // Cargar productos con solo el campo id para contar eficientemente
      // Usamos populate sin especificar campos para asegurar que devuelva un array
      productsQuery =
        "&populate[products][fields][0]=id&populate[products][fields][1]=documentId";
    } else if (whitProducts) {
      // Cargar todos los campos de productos con su categoría
      productsQuery =
        "&populate[products][fields][0]=slug&populate[products][fields][1]=name&populate[products][fields][2]=description&populate[products][fields][3]=price&populate[products][fields][4]=isActive&populate[products][fields][5]=size&populate[products][fields][6]=color&populate[products][fields][7]=texture&populate[products][populate][images][fields][0]=url&populate[products][populate][product_category][fields][0]=slug&populate[products][populate][product_category][fields][1]=title&populate[products][populate][product_category][fields][2]=description";
    }

    // Build search query
    let searchQueryStr = "";
    if (searchQuery.trim()) {
      searchQueryStr = `&filters[$or][0][title][$containsi]=${encodeURIComponent(searchQuery)}&filters[$or][1][description][$containsi]=${encodeURIComponent(searchQuery)}`;
    }

    // Build sort query
    let sortQueryStr = "";
    switch (sortBy) {
      case "name-asc":
        sortQueryStr = "&sort[0]=title:asc";
        break;
      case "name-desc":
        sortQueryStr = "&sort[0]=title:desc";
        break;
      case "products-desc":
        // Note: Strapi doesn't support sorting by relation count directly
        // We'll need to handle this client-side
        sortQueryStr = "&sort[0]=title:asc"; // Fallback to title sort
        break;
      default:
        sortQueryStr = "&sort[0]=title:asc";
    }

    const pagination = page
      ? `&pagination[page]=${page}&pagination[pageSize]=${itemsPerPage}`
      : "";

    const filters = filterCategory
      ? `filters[slug][$eq]=${filterCategory}&`
      : "";

    const excludeCategories = excludeCategory
      ? `&filters[slug][$ne]=${excludeCategory}`
      : "";

    const response = await gets({
      query: `product-categories?${filters}fields[0]=title&fields[1]=description&fields[2]=slug&populate[image][fields][0]=url${productsQuery}${searchQueryStr}${sortQueryStr}${pagination}${excludeCategories}`,
    });

    if (!response) {
      console.error("No se pudo conectar a la API de categorías")
      return { data: null, meta: null } as {
        data: ProductCategory[] | null;
        meta: responseMetaApi | null;
      };
    }

    const { data, meta } = response;
    if (data == null) {
      console.error("No se recibieron datos de las categorias")
      return { data: null, meta: null } as {
        data: ProductCategory[] | null;
        meta: responseMetaApi | null;
      };
    }
    return { data: data as ProductCategory[] | null, meta } as {
      data: ProductCategory[] | null;
      meta: responseMetaApi | null;
    };
  } catch (error) {
    console.error("Error al obtener las categorias", error);
  }
  return { data: null, meta: null };
}
