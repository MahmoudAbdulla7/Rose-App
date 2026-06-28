'use client';

import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

export default function PaginationComponent() {
  const params = useSearchParams();
  const currentPage = Number(params.get('page')) || 1;
  const totalPages = 14;

  const getPageItems = (total: number, current: number) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    pages.push(1);

    const start = Math.max(2, current - 2);
    const end = Math.min(total - 1, current + 2);

    if (start > 2) pages.push('…');
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < total - 1) pages.push('…');

    pages.push(total);
    return pages;
  };

  const pageItems = getPageItems(totalPages, currentPage);

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <Pagination>
      <PaginationContent>
        {/* First page */}
        <PaginationItem>
          <PaginationLink
            href="?page=1"
            aria-disabled={isFirst}
            className={isFirst ? 'pointer-events-none opacity-50' : ''}
          >
            <ChevronsLeft />
          </PaginationLink>
        </PaginationItem>

        {/* Previous page */}
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${currentPage - 1}`}
            aria-disabled={isFirst}
            className={isFirst ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {/* Page numbers & ellipsis */}
        {pageItems.map((item, index) => {
          if (item === '…') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          const pageNum = item as number;
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink href={`?page=${pageNum}`} isActive={currentPage === pageNum}>
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next page */}
        <PaginationItem>
          <PaginationNext
            href={`?page=${currentPage + 1}`}
            aria-disabled={isLast}
            className={isLast ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {/* Last page */}
        <PaginationItem>
          <PaginationLink
            href={`?page=${totalPages}`}
            aria-disabled={isLast}
            className={isLast ? 'pointer-events-none opacity-50' : ''}
          >
            <ChevronsRight />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    // 30m
  );
}
