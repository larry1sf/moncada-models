import { getCategorias } from "@/service/get-categorias";
import { notFound } from "next/navigation";
import { categoriasMook } from "@/lib/mock";
import { ProductCategory } from "@/types/typos";
import FilterBarSection from "@/components/categorias/filter-bar-section";
import GridList from "@/components/categorias/grid-list";
import CategoriasContextProvider from "@/context/categorias-context";

export default async function CategoriasList() {
    // Cargar categorías con información completa de productos
    const { data, meta } = await getCategorias({
        itemsPerPage: 6,
        onlyProductCount: true,
        whitProducts: false
    });

    const categorias = data ?? categoriasMook;
    const metaCategorias = meta?.pagination ?? { page: 0, pageCount: 0, pageSize: 0, total: 0 };

    if (!categorias) notFound();

    return (
        <CategoriasContextProvider initialData={categorias as ProductCategory[]} initialMeta={metaCategorias}>
            <div className="flex flex-col gap-10 sm:gap-12 lg:gap-16 w-full">
                {/* Filter Bar Section */}
                <FilterBarSection
                    initialMetaCollections={metaCategorias}
                    initialCollections={categorias as ProductCategory[]}
                />

                {/* Grid Section - Contenedor estable con transición suave */}
                <GridList />
            </div>
        </CategoriasContextProvider>
    );
}
