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
} from '@/shared/ui/pagination';

type PaginationComponentProps = {
  totalPages: number;
};

function getPageItems(total: number, current: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [1];
  const start = Math.max(2, current - 2);
  const end = Math.min(total - 1, current + 2);

  if (start > 2) pages.push('ellipsis');
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (end < total - 1) pages.push('ellipsis');

  pages.push(total);
  return pages;
}

function buildPageHref(searchParams: URLSearchParams, page: number) {
  const next = new URLSearchParams(searchParams.toString());

  if (page <= 1) {
    next.delete('page');
  } else {
    next.set('page', String(page));
  }

  const query = next.toString();
  return query ? `?${query}` : '?';
}

export default function PaginationComponent({ totalPages }: PaginationComponentProps) {
  const params = useSearchParams();
  const currentPage = Number(params.get('page')) || 1;

  if (totalPages <= 1) {
    return null;
  }

  const pageItems = getPageItems(totalPages, currentPage);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href={buildPageHref(params, 1)}
            aria-disabled={isFirst}
            aria-label="Go to first page"
            className={isFirst ? 'pointer-events-none opacity-50' : ''}
          >
            <ChevronsLeft className="rtl:rotate-180" />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationPrevious
            href={buildPageHref(params, currentPage - 1)}
            aria-disabled={isFirst}
            className={isFirst ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {pageItems.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={item}>
              <PaginationLink href={buildPageHref(params, item)} isActive={currentPage === item}>
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={buildPageHref(params, currentPage + 1)}
            aria-disabled={isLast}
            className={isLast ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href={buildPageHref(params, totalPages)}
            aria-disabled={isLast}
            aria-label="Go to last page"
            className={isLast ? 'pointer-events-none opacity-50' : ''}
          >
            <ChevronsRight className="rtl:rotate-180" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
