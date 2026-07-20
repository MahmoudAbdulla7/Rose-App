'use client';

import {
  clearFilterHref,
  isFilterActive,
  isValidPriceRange,
  PRODUCT_FILTER_KEYS,
  setFiltersHref,
} from '@/features/products/lib/utils/filter.utils';
import { useRouter } from '@/i18n/navigation';
import { useDebounce } from '@/shared/hooks';
import { searchParamsToObject } from '@/shared/lib/utils/search-params.utils';
import { Input } from '@/shared/ui/input';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import FilterSection from './filter-section';

export default function PriceFilters() {
  /* Translations */
  const tFilters = useTranslations('common.filters');
  const tButton = useTranslations('common.button');
  const tActions = useTranslations('common.actions');

  /* Search Params */
  const router = useRouter();
  const liveSearchParams = useSearchParams();

  const currentParams = useMemo(() => searchParamsToObject(liveSearchParams), [liveSearchParams]);

  const urlMin = liveSearchParams.get(PRODUCT_FILTER_KEYS.MIN_PRICE) ?? '';
  const urlMax = liveSearchParams.get(PRODUCT_FILTER_KEYS.MAX_PRICE) ?? '';

  const [minPrice, setMinPrice] = useState(urlMin);
  const [maxPrice, setMaxPrice] = useState(urlMax);

  /* Update State when Search Params Change */
  useEffect(() => {
    setMinPrice(urlMin);
    setMaxPrice(urlMax);
  }, [urlMin, urlMax]);

  /* Has Selection */
  const hasSelection = isFilterActive(currentParams, [
    PRODUCT_FILTER_KEYS.MIN_PRICE,
    PRODUCT_FILTER_KEYS.MAX_PRICE,
  ]);

  /* Commit both ends together; skip while max < min so typing stays free */
  const syncPriceRange = useCallback(() => {
    if (!isValidPriceRange(minPrice, maxPrice)) return;

    const trimmedMin = minPrice.trim();
    const trimmedMax = maxPrice.trim();

    router.push(
      setFiltersHref(currentParams, {
        [PRODUCT_FILTER_KEYS.MIN_PRICE]: trimmedMin,
        [PRODUCT_FILTER_KEYS.MAX_PRICE]: trimmedMax,
      }),
      { scroll: false },
    );
  }, [currentParams, maxPrice, minPrice, router]);

  useDebounce({
    callback: syncPriceRange,
    deps: [minPrice, maxPrice],
  });

  const minBound = minPrice.trim() ? Number(minPrice) : 0;

  return (
    <FilterSection
      title={tFilters('price')}
      clearLinkProps={
        hasSelection
          ? {
              href: clearFilterHref(currentParams, [
                PRODUCT_FILTER_KEYS.MIN_PRICE,
                PRODUCT_FILTER_KEYS.MAX_PRICE,
              ]),
              'aria-label': tActions('clearPrice'),
              text: tButton('reset'),
            }
          : undefined
      }
    >
      <div className="flex items-start gap-2">
        <Input
          type="number"
          inputMode="numeric"
          min={0}
          max={maxPrice.trim() ? Number(maxPrice) : undefined}
          label={tFilters('from')}
          placeholder="0"
          value={minPrice}
          onChange={(event) => setMinPrice(event.target.value)}
          className="h-auto rounded-xl py-4"
          wrapperClassName="flex-1"
        />
        <Input
          type="number"
          inputMode="numeric"
          min={Number.isNaN(minBound) ? 0 : minBound}
          label={tFilters('to')}
          placeholder="1000000"
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
          className="h-auto rounded-xl py-4"
          wrapperClassName="flex-1"
        />
      </div>
    </FilterSection>
  );
}
