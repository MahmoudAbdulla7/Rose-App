import {
  clearFilterHref,
  getSearchParam,
  PRODUCT_FILTER_KEYS,
} from '@/features/products/lib/utils/filter.utils';
import { getTranslations } from 'next-intl/server';
import FilterSection from './filter-section';
import RatingFilterStars from './rating-filter-stars';

export type RatingFiltersProps = {
  searchParams: ISearchParams;
};

export default async function RatingFilters({ searchParams }: RatingFiltersProps) {
  /* Translations */
  const tFilters = await getTranslations('common.filters');
  const tButton = await getTranslations('common.button');
  const tActions = await getTranslations('common.actions');

  /* Selected Rating */
  const selectedRating = Number(getSearchParam(searchParams, PRODUCT_FILTER_KEYS.MIN_RATING) ?? 0);

  /* Has Selection */
  const hasSelection = selectedRating > 0;

  return (
    <FilterSection
      title={tFilters('rating')}
      clearLinkProps={
        hasSelection
          ? {
              href: clearFilterHref(searchParams, [PRODUCT_FILTER_KEYS.MIN_RATING]),
              'aria-label': tActions('clearRating'),
              text: tButton('reset'),
            }
          : undefined
      }
    >
      <RatingFilterStars searchParams={searchParams} selectedRating={selectedRating} />
    </FilterSection>
  );
}
