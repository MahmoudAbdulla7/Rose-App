import { getProductsPageCategories } from '@/features/products/lib/services/categories.service';
import { getProductsPageOccasions } from '@/features/products/lib/services/occasions.service';
import {
  ALL_PRODUCT_FILTER_KEYS,
  clearFilterHref,
  isFilterActive,
} from '@/features/products/lib/utils/filter.utils';
import { getLocale, getTranslations } from 'next-intl/server';
import FiltersPanel from './filters-panel';
import FiltersSheet from './filters-sheet';
import ResetAllFilters from './reset-all-filters';

export type FiltersProps = {
  searchParams?: ISearchParams;
};

export default async function Filters({ searchParams = {} }: FiltersProps) {
  const locale = await getLocale();
  const tFilters = await getTranslations('common.filters');

  const [categories, occasions] = await Promise.all([
    getProductsPageCategories({ locale }),
    getProductsPageOccasions({ locale }),
  ]);

  const hasActiveFilters = isFilterActive(searchParams, ALL_PRODUCT_FILTER_KEYS);
  const resetAllHref = clearFilterHref(searchParams, ALL_PRODUCT_FILTER_KEYS);

  const panelProps = {
    categories,
    occasions,
    searchParams,
  };

  return (
    <>
      <FiltersSheet
        hasActiveFilters={hasActiveFilters}
        footer={<ResetAllFilters href={resetAllHref} hasActiveFilters={hasActiveFilters} />}
      >
        <FiltersPanel {...panelProps} />
      </FiltersSheet>

      <aside
        aria-label={tFilters('sidebarLabel')}
        className="hidden flex-col border-e border-zinc-100 pe-6 lg:flex dark:border-zinc-800"
      >
        <FiltersPanel {...panelProps}>
          <ResetAllFilters href={resetAllHref} hasActiveFilters={hasActiveFilters} />
        </FiltersPanel>
      </aside>
    </>
  );
}
