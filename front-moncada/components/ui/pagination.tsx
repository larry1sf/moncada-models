"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function Pagination({ currentPage, pageCount, onPageChange, isLoading }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6">
      <Button
        variant="default"
        className="hover:bg-text-dark text-sm sm:text-base capitalize px-4 py-6 rounded-2xl shadow-sm transition-all hover:scale-105"
        type="button"
        disabled={currentPage === 1 || isLoading}
        onClick={() => onPageChange(currentPage - 1)}
      >
        anterior
      </Button>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: pageCount }).map((_, i) => {
          const pageNumber = i + 1;
          // Lógica para mostrar solo algunas páginas si hay demasiadas (opcional, pero ayuda)
          if (
            pageCount > 7 &&
            pageNumber !== 1 &&
            pageNumber !== pageCount &&
            Math.abs(pageNumber - currentPage) > 2
          ) {
            if (Math.abs(pageNumber - currentPage) === 3) {
              return <span key={i} className="px-1 text-accent">...</span>;
            }
            return null;
          }

          return (
            <Button
              onClick={() => onPageChange(pageNumber)}
              key={i}
              variant={currentPage === pageNumber ? "default" : "outline"}
              disabled={isLoading}
              className={`text-sm sm:text-base min-w-10 sm:min-w-12 h-10 sm:h-12 rounded-2xl transition-all ${currentPage === pageNumber
                ? "bg-accent text-white hover:bg-accent/90 shadow-md scale-110"
                : "border-accent/20 hover:bg-accent/10 text-text-dark"
                }`}
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      <Button
        variant="default"
        className="hover:bg-text-dark text-sm sm:text-base capitalize px-4 py-6 rounded-2xl shadow-sm transition-all hover:scale-105"
        type="button"
        disabled={currentPage === pageCount || isLoading}
        onClick={() => onPageChange(currentPage + 1)}
      >
        siguiente
      </Button>
    </nav>
  );
}
