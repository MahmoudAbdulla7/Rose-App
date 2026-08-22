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
  searchParams: Promise<ISearchParams>;
};

export default async function Filters({ searchParams }: FiltersProps) {
  const resolvedSearchParams = await searchParams;
  const locale = await getLocale();
  const tFilters = await getTranslations('common.filters');

  const [categories, occasions] = await Promise.all([
    getProductsPageCategories({ locale }),
    getProductsPageOccasions({ locale }),
  ]);

  const hasActiveFilters = isFilterActive(resolvedSearchParams, ALL_PRODUCT_FILTER_KEYS);
  const resetAllHref = clearFilterHref(resolvedSearchParams, ALL_PRODUCT_FILTER_KEYS);

  const panelProps = {
    categories,
    occasions,
    searchParams: resolvedSearchParams,
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
        className="animate-in fade-in-0 slide-in-from-start-2 hidden flex-col border-e border-zinc-100 pe-6 duration-300 ease-out lg:flex dark:border-zinc-800"
      >
        <FiltersPanel {...panelProps}>
          <ResetAllFilters href={resetAllHref} hasActiveFilters={hasActiveFilters} />
        </FiltersPanel>
      </aside>
    </>
  );
}
