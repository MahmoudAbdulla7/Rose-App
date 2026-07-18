import { MoveRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import PopularProductsGrid from '@/features/landing-page/components/popular-products-grid';
import PopularProductsOccasionsFilter from '@/features/landing-page/components/popular-products-occasions-filter';
import { Link } from '@/i18n/navigation';
import LoadErrorBoundary from '@/shared/components/load-error-boundary';
import { PRODUCTS_OPTIONS } from '@/shared/lib/apis/products/products.options';
import { cn } from '@/shared/lib/utils';
import { isMobileDevice } from '@/shared/lib/utils/device.utils';
import PopularProductsGridSkeleton from '../skeletons/popular-products-grid.skeleton';
import { getLandingPageOccasions } from '../lib/services/occasions.service';

export interface IPopularProductsSectionProps {
  searchParams?: ISearchParams;
}

export default function PopularProductsSection({
  searchParams = {},
}: IPopularProductsSectionProps) {
  return (
    <LoadErrorBoundary entity="occasions">
      <PopularProductsSectionContent searchParams={searchParams} />
    </LoadErrorBoundary>
  );
}

async function PopularProductsSectionContent({ searchParams = {} }: IPopularProductsSectionProps) {
  const t = await getTranslations('product.popularProducts');
  const locale = await getLocale();
  const isMobile = await isMobileDevice();

  // Occasions — failures throw and are caught by the section error boundary
  const occasions = await getLandingPageOccasions({ locale });

  const rawOccasion = searchParams.occasion;
  const activeOccasionId = Array.isArray(rawOccasion) ? rawOccasion[0] : rawOccasion;
  const occasionId = activeOccasionId ?? occasions[0]?.id;

  const effectiveSearchParams: ISearchParams = {
    ...searchParams,
    ...(occasionId ? { occasion: occasionId } : {}),
  };

  const skeletonLimit = isMobile ? PRODUCTS_OPTIONS.MOBILE_LIMIT : PRODUCTS_OPTIONS.DESKTOP_LIMIT;

  return (
    <section className="flex w-full flex-col gap-10">
      <div className="flex w-full min-w-0 flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <h2
          className={cn(
            'text-maroon-700 dark:text-soft-pink-200 relative isolate shrink-0 text-4xl leading-none font-bold',
            "before:bg-soft-pink-100 before:absolute before:start-0 before:top-6 before:-z-10 before:h-4 before:w-38.5 before:rounded-e-full before:content-[''] dark:before:bg-zinc-700",
            "after:bg-soft-pink-600 dark:after:bg-soft-pink-500 after:absolute after:start-0 after:top-10 after:-z-10 after:h-0.5 after:w-15 after:content-['']",
          )}
        >
          {t('sectionTitle')}
        </h2>

        <PopularProductsOccasionsFilter
          searchParams={effectiveSearchParams}
          occasions={occasions}
        />
      </div>

      <Suspense fallback={<PopularProductsGridSkeleton limit={skeletonLimit} />}>
        <LoadErrorBoundary entity="products">
          <PopularProductsGrid searchParams={effectiveSearchParams} />
        </LoadErrorBoundary>
      </Suspense>

      <div className="flex h-10 w-full items-center justify-end gap-2.5">
        <Link
          href={occasionId ? `/products?occasion=${occasionId}` : '/products'}
          className="text-maroon-700 dark:text-soft-pink-200 inline-flex items-center gap-2.5 text-base leading-none font-semibold transition-opacity hover:opacity-90"
        >
          {t('viewMore')}
          <MoveRight className="size-5 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
