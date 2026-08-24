import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import CategoriesGrid from '@/features/landing-page/components/categories/categories-grid';
import CategoriesSearch from '@/features/landing-page/components/categories/categories-search';
import SectionHeading from '@/features/landing-page/components/home/section-heading';
import {
  CategoriesGridSkeleton,
  CategoriesSearchSkeleton,
} from '@/features/landing-page/skeletons/categories/categories-page.skeleton';
import LoadErrorBoundary from '@/shared/components/load-error-boundary';

type CategoriesPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<ISearchParams>;
};

export async function generateMetadata({ params }: CategoriesPageProps): Promise<Metadata> {
  const { locale } = await params;

  const commonT = await getTranslations({ locale: locale as Locale, namespace: 'common' });

  return {
    title: `${commonT('app.title')} | ${commonT('pages.categories')}`,
    description: commonT('categories.metadataDescription'),
  };
}

export default async function CategoriesPage({ searchParams }: CategoriesPageProps) {
  const t = await getTranslations('common');

  return (
    <main className="container flex flex-col gap-10 overflow-hidden py-6 sm:py-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading id="categories-heading">{t('pages.categories')}</SectionHeading>
        <Suspense fallback={<CategoriesSearchSkeleton />}>
          <CategoriesSearch />
        </Suspense>
      </div>

      <Suspense fallback={<CategoriesGridSkeleton />}>
        <LoadErrorBoundary entity="categories">
          <CategoriesGrid searchParams={searchParams} />
        </LoadErrorBoundary>
      </Suspense>
    </main>
  );
}
