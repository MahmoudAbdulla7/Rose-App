import type { getProductsPageCategories } from '@/features/products/lib/services/categories.service';
import type { getProductsPageOccasions } from '@/features/products/lib/services/occasions.service';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import CategoryFilters from './category-filters';
import OccasionFilters from './occasion-filters';
import PriceFilters from './price-filters';
import RatingFilters from './rating-filters';

export type FiltersPanelProps = {
  categories: Awaited<ReturnType<typeof getProductsPageCategories>>;
  occasions: Awaited<ReturnType<typeof getProductsPageOccasions>>;
  searchParams: ISearchParams;
  children?: React.ReactNode;
};

export default async function FiltersPanel({
  categories,
  occasions,
  searchParams,
  children,
}: FiltersPanelProps) {
  const tFilters = await getTranslations('common.filters');

  return (
    <>
      <CategoryFilters categories={categories} searchParams={searchParams} />
      <OccasionFilters occasions={occasions} searchParams={searchParams} />
      <RatingFilters searchParams={searchParams} />
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

      {children && <div className="flex flex-col gap-2.5 py-4">{children}</div>}
    </>
  );
}
