import ProductsContent from '@/features/products/components/products-content/products-content';
import Filters from '@/features/products/components/sidebar/filters';
import FiltersSkeleton from '@/features/products/skeletons/sidebar/filters.skeleton';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<ISearchParams>;
};

export async function generateMetadata({ params }: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;

  const productT = await getTranslations({ locale: locale as Locale, namespace: 'product' });
  const commonT = await getTranslations({ locale: locale as Locale, namespace: 'common' });

  return {
    title: `${commonT('app.title')} | ${productT('metadata.title')}`,
    description: productT('metadata.description'),
  };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <main className="container grid grid-cols-1 gap-4 overflow-hidden py-6 sm:gap-6 sm:py-8 lg:grid-cols-[minmax(0,25%)_minmax(0,1fr)] lg:gap-6.25">
      <section className="min-w-0 lg:rounded-lg">
        <Suspense fallback={<FiltersSkeleton />}>
          <Filters searchParams={searchParams} />
        </Suspense>
      </section>
      <section className="flex min-w-0 flex-col rounded-lg">
        <ProductsContent searchParams={searchParams} />
      </section>
    </main>
  );
}
