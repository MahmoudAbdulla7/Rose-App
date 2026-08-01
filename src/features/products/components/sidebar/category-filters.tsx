import {
  clearFilterHref,
  getSearchParam,
  PRODUCT_FILTER_KEYS,
  sortByTitle,
} from '@/features/products/lib/utils/filter.utils';
import type { ICategory } from '@/shared/lib/types/categories';
import { getTranslations } from 'next-intl/server';
import CategoryFilterItem from './category-filter-item';
import FilterSection from './filter-section';

export type CategoryFiltersProps = {
  categories: ICategory[];
  searchParams: ISearchParams;
};

export default async function CategoryFilters({ categories, searchParams }: CategoryFiltersProps) {
  /* Translations */
  const tFilters = await getTranslations('common.filters');
  const tButton = await getTranslations('common.button');
  const tActions = await getTranslations('common.actions');

  /* Selected Category ID */
  const selectedCategoryId = getSearchParam(searchParams, PRODUCT_FILTER_KEYS.CATEGORY);

  /* Sorted Categories */
  const sortedCategories = sortByTitle(categories);

  /* Has Selection */
  const hasSelection = Boolean(selectedCategoryId);

  return (
    <FilterSection
      title={tFilters('category')}
      clearLinkProps={
        hasSelection
          ? {
              href: clearFilterHref(searchParams, [PRODUCT_FILTER_KEYS.CATEGORY]),
              'aria-label': tActions('clearCategory'),
              text: tButton('reset'),
            }
          : undefined
      }
    >
      <ul
        className="no-scrollbar flex h-49.75 max-h-49.75 min-h-0 flex-col gap-1 overflow-y-auto"
        aria-label={tFilters('category')}
      >
        {sortedCategories.map((category) => (
          <li key={category.id}>
            <CategoryFilterItem
              category={category}
              searchParams={searchParams}
              isSelected={selectedCategoryId === category.id}
            />
          </li>
        ))}
      </ul>
    </FilterSection>
  );
}
