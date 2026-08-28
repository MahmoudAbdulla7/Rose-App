'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { useRouter } from '@/i18n/navigation';
import { useDebounce } from '@/shared/hooks';
import { clearFilterHref, setFilterHref } from '@/shared/lib/utils/filter.utils';
import { searchParamsToObject } from '@/shared/lib/utils/search-params.utils';
import { SearchInput } from '@/shared/ui/search-input';

const SEARCH_KEY = 'search';
const SEARCH_MAX_CHARS = 200;

type SearchFilterProps = {
  placeholder?: string;
  label?: string;
  className?: string;
};

/** Search box that keeps `?search=` in the URL, debounced while typing. */
export default function SearchFilter({ placeholder, label, className }: SearchFilterProps) {
  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [query, setQuery] = useState(searchParams.get(SEARCH_KEY) ?? '');

  // Custom hooks
  useDebounce({ callback: () => pushSearch(query.trim()), deps: [query] });

  // Variables
  const urlSearch = searchParams.get(SEARCH_KEY) ?? '';

  // Functions
  function pushSearch(value: string) {
    if (value === urlSearch) return;

    const params = searchParamsToObject(searchParams);
    router.push(
      value ? setFilterHref(params, SEARCH_KEY, value) : clearFilterHref(params, [SEARCH_KEY]),
      { scroll: false },
    );
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleClear() {
    setQuery('');
    pushSearch('');
  }

  // Effects
  useEffect(() => setQuery(urlSearch), [urlSearch]);

  return (
    <SearchInput
      value={query}
      onChange={handleChange}
      onClear={handleClear}
      placeholder={placeholder}
      aria-label={label}
      maxLength={SEARCH_MAX_CHARS}
      autoComplete="off"
      wrapperClassName={className}
    />
  );
}
