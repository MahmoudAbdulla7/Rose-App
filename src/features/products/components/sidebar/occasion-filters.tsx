import {
  clearFilterHref,
  getSearchParam,
  PRODUCT_FILTER_KEYS,
  sortByTitle,
} from '@/features/products/lib/utils/filter.utils';
import type { IOccasion } from '@/shared/lib/types/occasions';
import { getTranslations } from 'next-intl/server';
import FilterSection from './filter-section';
import OccasionFilterItem from './occasion-filter-item';

export type OccasionFiltersProps = {
  occasions: IOccasion[];
  searchParams: ISearchParams;
};

export default async function OccasionFilters({ occasions, searchParams }: OccasionFiltersProps) {
  /* Translations */
  const tFilters = await getTranslations('common.filters');
  const tButton = await getTranslations('common.button');
  const tActions = await getTranslations('common.actions');

  /* Selected Occasion ID */
  const selectedOccasionId = getSearchParam(searchParams, PRODUCT_FILTER_KEYS.OCCASION);

  /* Sorted Occasions */
  const sortedOccasions = sortByTitle(occasions);

  /* Has Selection */
  const hasSelection = Boolean(selectedOccasionId);

  return (
    <FilterSection
      title={tFilters('occasion')}
      clearLinkProps={
        hasSelection
          ? {
              href: clearFilterHref(searchParams, [PRODUCT_FILTER_KEYS.OCCASION]),
              'aria-label': tActions('clearOccasion'),
              text: tButton('reset'),
            }
          : undefined
      }
    >
      <ul
        className="no-scrollbar grid h-60.5 grid-cols-2 content-start gap-2.5 overflow-y-auto"
        aria-label={tFilters('occasion')}
      >
        {sortedOccasions.map((occasion) => (
          <li key={occasion.id} className="h-18.5 min-w-0">
            <OccasionFilterItem
              occasion={occasion}
              searchParams={searchParams}
              isSelected={selectedOccasionId === occasion.id}
            />
          </li>
        ))}
      </ul>
    </FilterSection>
  );
}
