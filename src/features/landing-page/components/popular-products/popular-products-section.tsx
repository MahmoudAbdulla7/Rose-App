import { MoveRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import PopularProductsGrid from '@/features/landing-page/components/popular-products/popular-products-grid';
import PopularProductsOccasionsFilter from '@/features/landing-page/components/popular-products/popular-products-occasions-filter';
import { getLandingPageOccasions } from '@/features/landing-page/lib/services/occasions.service';
import PopularProductsGridSkeleton from '@/features/landing-page/skeletons/popular-products/popular-products-grid.skeleton';
import { Link } from '@/i18n/navigation';
import LoadErrorBoundary from '@/shared/components/load-error-boundary';
import { PRODUCT_SORT_BY } from '@/shared/lib/apis/products/products.options';
import SectionHeading from '../home/section-heading';
import { PRODUCT_FILTER_KEYS } from '@/features/products/lib/utils/filter.utils';

export interface IPopularProductsSectionProps {
  searchParams: Promise<ISearchParams>;
}

export default function PopularProductsSection({ searchParams }: IPopularProductsSectionProps) {
  return (
    <LoadErrorBoundary entity="occasions">
      <PopularProductsSectionContent searchParams={searchParams} />
    </LoadErrorBoundary>
  );
}

async function PopularProductsSectionContent({ searchParams }: IPopularProductsSectionProps) {
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations('product.popularProducts');
  const locale = await getLocale();

  const occasions = await getLandingPageOccasions({ locale });

  const rawOccasion = resolvedSearchParams.occasion;
  const activeOccasionId = Array.isArray(rawOccasion) ? rawOccasion[0] : rawOccasion;
  const occasionId = activeOccasionId ?? occasions[0]?.id;

  const effectiveSearchParams: ISearchParams = {
    ...resolvedSearchParams,
    sortBy: PRODUCT_SORT_BY.MOST_POPULAR,
    ...(occasionId ? { occasion: occasionId } : {}),
  };

  return (
    <section className="flex w-full flex-col gap-10">
      <div className="flex w-full min-w-0 flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <SectionHeading id="popular-products-heading">{t('sectionTitle')}</SectionHeading>

        <PopularProductsOccasionsFilter
          searchParams={effectiveSearchParams}
          occasions={occasions}
        />
      </div>

      <Suspense fallback={<PopularProductsGridSkeleton />}>
        <LoadErrorBoundary entity="products">
          <PopularProductsGrid searchParams={effectiveSearchParams} />
        </LoadErrorBoundary>
      </Suspense>

      <div className="flex h-10 w-full items-center justify-end gap-2.5">
        <Link
          href={
            occasionId ? `/products?${PRODUCT_FILTER_KEYS.OCCASION}=${occasionId}` : '/products'
          }
          className="text-maroon-700 dark:text-soft-pink-200 inline-flex items-center gap-2.5 text-base leading-none font-semibold transition-opacity hover:opacity-90"
        >
          {t('viewMore')}
          <MoveRight className="size-5 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
