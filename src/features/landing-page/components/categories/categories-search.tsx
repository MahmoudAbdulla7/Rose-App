'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { clearFilterHref, setFilterHref } from '@/features/products/lib/utils/filter.utils';
import { useRouter } from '@/i18n/navigation';
import { useDebounce } from '@/shared/hooks';
import { searchParamsToObject } from '@/shared/lib/utils/search-params.utils';
import { SearchInput } from '@/shared/ui/search-input';
import { cn } from '@/shared/lib/utils';

const SEARCH_KEY = 'search';
const SEARCH_MAX_CHARS = 200;

type CategoriesSearchProps = {
  className?: string;
};

export default function CategoriesSearch({ className }: CategoriesSearchProps) {
  const t = useTranslations('common.categories');
  const router = useRouter();
  const liveSearchParams = useSearchParams();

  const urlSearch = liveSearchParams.get(SEARCH_KEY) ?? '';
  const [query, setQuery] = useState(urlSearch);

  useEffect(() => {
    setQuery(urlSearch);
  }, [urlSearch]);

  const syncSearch = useCallback(() => {
    const trimmed = query.trim().slice(0, SEARCH_MAX_CHARS);
    const latestParams = searchParamsToObject(liveSearchParams);
    const latestSearch = liveSearchParams.get(SEARCH_KEY) ?? '';

    if (trimmed === latestSearch) return;

    if (!trimmed) {
      if (!latestSearch) return;
      router.push(clearFilterHref(latestParams, [SEARCH_KEY]), { scroll: false });
      return;
    }

    router.push(setFilterHref(latestParams, SEARCH_KEY, trimmed), { scroll: false });
  }, [liveSearchParams, query, router]);

  useDebounce({
    callback: syncSearch,
    deps: [query],
  });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.slice(0, SEARCH_MAX_CHARS));
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
    const latestParams = searchParamsToObject(liveSearchParams);
    if (liveSearchParams.get(SEARCH_KEY)) {
      router.push(clearFilterHref(latestParams, [SEARCH_KEY]), { scroll: false });
    }
  }, [liveSearchParams, router]);

  return (
    <SearchInput
      value={query}
      onChange={handleChange}
      onClear={handleClear}
      placeholder={t('searchPlaceholder')}
      aria-label={t('searchLabel')}
      maxLength={SEARCH_MAX_CHARS}
      autoComplete="off"
      wrapperClassName={cn('w-full max-w-md', className)}
    />
  );
}
