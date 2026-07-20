import { getProductsPageCategories } from '@/features/products/lib/services/categories.service';
import { getProductsPageOccasions } from '@/features/products/lib/services/occasions.service';
import {
  ALL_PRODUCT_FILTER_KEYS,
  clearFilterHref,
  isFilterActive,
} from '@/features/products/lib/utils/filter.utils';
import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '@/shared/ui/button';
import { RotateCcw } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import CategoryFilters from './category-filters';
import OccasionFilters from './occasion-filters';
import PriceFilters from './price-filters';
import RatingFilters from './rating-filters';

export type FiltersProps = {
  searchParams?: ISearchParams;
};

export default async function Filters({ searchParams = {} }: FiltersProps) {
  const locale = await getLocale();
  const tFilters = await getTranslations('common.filters');
  const tButton = await getTranslations('common.button');

  const [categories, occasions] = await Promise.all([
    getProductsPageCategories({ locale }),
    getProductsPageOccasions({ locale }),
  ]);

  const hasActiveFilters = isFilterActive(searchParams, ALL_PRODUCT_FILTER_KEYS);
  const resetAllHref = clearFilterHref(searchParams, ALL_PRODUCT_FILTER_KEYS);

  return (
    <aside
      aria-label={tFilters('sidebarLabel')}
      className="flex flex-col border-r border-zinc-100 pe-6 dark:border-zinc-800"
    >
      {/* Category Filters */}
      <CategoryFilters categories={categories} searchParams={searchParams} />
      {/* Occasion Filters */}
      <OccasionFilters occasions={occasions} searchParams={searchParams} />
      {/* Rating Filters */}
      <RatingFilters searchParams={searchParams} />
      {/* Price Filters */}
      <Suspense
        fallback={
          <section className="flex flex-col gap-2.5 border-b border-zinc-100 py-2.5 pb-5 dark:border-zinc-800">
            <h2 className="text-lg leading-none font-semibold text-zinc-800 dark:text-zinc-100">
              {tFilters('price')}
            </h2>
            <div className="bg-ds-muted h-22.5 animate-pulse rounded-xl" />
          </section>
        }
      >
        <PriceFilters />
      </Suspense>

      {/* Reset All Filters */}
      <div className="flex flex-col gap-2.5 py-4">
        <Link
          href={resetAllHref}
          scroll={false}
          aria-disabled={!hasActiveFilters}
          tabIndex={hasActiveFilters ? undefined : -1}
          className={cn(
            buttonVariants({ variant: 'secondary' }),
            'h-10.25 w-full rounded-xl font-semibold',
            !hasActiveFilters && 'pointer-events-none opacity-50',
          )}
        >
          <RotateCcw className="size-4.5 shrink-0" aria-hidden="true" />
          {tButton('resetAll')}
        </Link>
      </div>
    </aside>
  );
}
