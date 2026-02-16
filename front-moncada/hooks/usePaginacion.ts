'use client'
import { ProductCategory, Producto } from "@/types/typos"
import { useState } from "react"

export default function PaginationControl({
    items,
    itemsPerPage,
}: {
    items: (Producto | ProductCategory)[],
    itemsPerPage: number,
}) {
    const [page, setPage] = useState(1)

    const totalPages = Math.ceil(items.length / itemsPerPage)

    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage
    const paginatedItems = items.slice(start, end)

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage)
        }
    }

    return {
        handlePageChange,
        setPage,
        paginatedItems,
        totalPages,
        page,
    }
}