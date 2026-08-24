'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type OrdersPaginationProps = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function OrdersPagination({ page, totalPages, onPageChange }: OrdersPaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2">
            <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                className="rounded-full p-2 disabled:opacity-40"
                aria-label="Previous page"
            >
                <ChevronLeft className="size-4" />
            </button>

            <span className="text-sm">
                Page {page} of {totalPages}
            </span>

            <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
                className="rounded-full p-2 disabled:opacity-40"
                aria-label="Next page"
            >
                <ChevronRight className="size-4" />
            </button>
        </div>
    );
}