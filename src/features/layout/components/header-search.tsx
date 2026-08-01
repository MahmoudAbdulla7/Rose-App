'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import HeaderSearchResultItem from '@/features/layout/components/header-search-result-item';
import {
  clearFilterHref,
  PRODUCT_FILTER_KEYS,
  setFilterHref,
} from '@/features/products/lib/utils/filter.utils';
import { usePathname, useRouter } from '@/i18n/navigation';
import { PRODUCTS_OPTIONS } from '@/shared/lib/apis/products/products.options';
import { fetchProductSearch } from '@/shared/lib/apis/products/user-product-search.api';
import type { IProduct } from '@/shared/lib/types/product';
import { cn } from '@/shared/lib/utils';
import { searchParamsToObject } from '@/shared/lib/utils/search-params.utils';
import { useDebounce } from '@/shared/hooks';
import { SearchInput } from '@/shared/ui/search-input';
import Skeleton from '@/shared/ui/skeleton';

type HeaderSearchProps = {
  suggestions: IProduct[];
  placeholder?: string;
  wrapperClassName?: string;
};

export default function HeaderSearch({
  suggestions,
  placeholder,
  wrapperClassName,
}: HeaderSearchProps) {
  // Translations & routing
  const t = useTranslations('header.search');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const liveSearchParams = useSearchParams();
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  // Same as price filters: URL is the source of truth on the products page
  const isProductsPage = pathname === '/products';
  const urlSearch = isProductsPage ? (liveSearchParams.get(PRODUCT_FILTER_KEYS.SEARCH) ?? '') : '';

  // Search state
  const [query, setQuery] = useState(urlSearch);
  const [debouncedQuery, setDebouncedQuery] = useState(urlSearch.trim());
  const [isOpen, setIsOpen] = useState(false);

  // Keep input in sync when search filter changes (e.g. reset all filters)
  useEffect(() => {
    setQuery(urlSearch);
    setDebouncedQuery(urlSearch.trim());
  }, [urlSearch]);

  const trimmedQuery = query.trim().slice(0, PRODUCTS_OPTIONS.SEARCH_MAX_CHARS);
  const isSearchMode = trimmedQuery.length >= PRODUCTS_OPTIONS.SEARCH_MIN_CHARS;

  // Debounce before calling the live search API
  useDebounce({
    callback: () => setDebouncedQuery(trimmedQuery),
    deps: [trimmedQuery],
    delay: 400,
  });

  // Live product search (only while the panel is open)
  const {
    data: searchResponse,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [...PRODUCTS_OPTIONS.QUERY_KEY, 'search', debouncedQuery, locale],
    queryFn: () => fetchProductSearch(debouncedQuery, locale),
    enabled: debouncedQuery.length >= PRODUCTS_OPTIONS.SEARCH_MIN_CHARS && isOpen,
  });

  const searchResults = searchResponse?.status === true ? (searchResponse.payload.data ?? []) : [];

  // Handlers
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.slice(0, PRODUCTS_OPTIONS.SEARCH_MAX_CHARS));
    setIsOpen(true);
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
    setIsOpen(true);

    // Clear the search filter from the URL when on the products page
    if (isProductsPage && liveSearchParams.get(PRODUCT_FILTER_KEYS.SEARCH)) {
      const currentParams = searchParamsToObject(liveSearchParams);
      router.push(clearFilterHref(currentParams, [PRODUCT_FILTER_KEYS.SEARCH]), { scroll: false });
    }
  }, [isProductsPage, liveSearchParams, router]);

  const handleSelect = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Submit sets the search filter (same pattern as price/category filters)
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (trimmedQuery.length < PRODUCTS_OPTIONS.SEARCH_MIN_CHARS) return;

      setIsOpen(false);

      if (isProductsPage) {
        const currentParams = searchParamsToObject(liveSearchParams);
        router.push(setFilterHref(currentParams, PRODUCT_FILTER_KEYS.SEARCH, trimmedQuery), {
          scroll: false,
        });
        return;
      }

      router.push(`/products?${PRODUCT_FILTER_KEYS.SEARCH}=${encodeURIComponent(trimmedQuery)}`);
    },
    [isProductsPage, liveSearchParams, router, trimmedQuery],
  );

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const showSuggestions = isOpen && !isSearchMode;
  const showSearchResults = isOpen && isSearchMode;
  const isDebouncing = isSearchMode && trimmedQuery !== debouncedQuery;

  return (
    <div ref={containerRef} className={cn('relative min-w-0', wrapperClassName)}>
      <form onSubmit={handleSubmit}>
        <SearchInput
          value={query}
          onChange={handleChange}
          onClear={handleClear}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          autoComplete="off"
          maxLength={PRODUCTS_OPTIONS.SEARCH_MAX_CHARS}
          wrapperClassName="w-full max-w-none"
        />
      </form>

      {isOpen ? (
        <div
          id={listboxId}
          role="listbox"
          aria-label={isSearchMode ? t('resultsLabel') : t('suggestionsLabel')}
          className="border-ds-border-soft bg-ds-plain shadow-ds-soft absolute inset-s-0 top-[calc(100%+0.5rem)] z-50 max-h-96 w-full overflow-y-auto rounded-xl border p-2"
        >
          {/* Suggestions when the query is too short */}
          {showSuggestions ? (
            <>
              <p className="text-ds-text-muted px-2 py-1.5 text-xs font-semibold tracking-wide uppercase">
                {t('youMayLike')}
              </p>
              {suggestions.length > 0 ? (
                <ul className="flex flex-col gap-0.5">
                  {suggestions.map((product) => (
                    <li key={product.id} role="option" aria-selected="false">
                      <HeaderSearchResultItem product={product} onSelect={handleSelect} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-ds-text-muted px-2 py-6 text-center text-sm">
                  {t('emptySuggestions')}
                </p>
              )}
            </>
          ) : null}

          {/* Live search results */}
          {showSearchResults ? (
            <>
              {isFetching || isDebouncing ? (
                <div className="flex flex-col gap-2 p-1" aria-busy="true" aria-label={t('loading')}>
                  {Array.from({ length: 3 }, (_, index) => (
                    <div key={index} className="flex items-center gap-3 p-2">
                      <Skeleton className="bg-ds-soft size-14 shrink-0 rounded-lg" />
                      <div className="flex flex-1 flex-col gap-2">
                        <Skeleton className="bg-ds-soft h-4 w-3/4" />
                        <Skeleton className="bg-ds-soft h-3 w-20" />
                        <Skeleton className="bg-ds-soft h-4 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : isError ? (
                <p className="text-ds-text-muted px-2 py-6 text-center text-sm">{t('error')}</p>
              ) : searchResults.length > 0 ? (
                <ul className="flex flex-col gap-0.5">
                  {searchResults.map((product) => (
                    <li key={product.id} role="option" aria-selected="false">
                      <HeaderSearchResultItem
                        product={product}
                        searchTerm={debouncedQuery}
                        onSelect={handleSelect}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-ds-text-muted px-2 py-6 text-center text-sm">{t('noResults')}</p>
              )}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
