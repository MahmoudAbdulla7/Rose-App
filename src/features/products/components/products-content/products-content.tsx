import { getFilteredProducts } from '@/features/products/lib/services/products.service';
import LoadErrorBoundary from '@/shared/components/load-error-boundary';
import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';
import ProductsContentPagination from './pagination';
import ProductsGrid from './products-grid';
import ProductsGridSkeleton from './products-grid.skeleton';

type ProductsContentProps = {
  searchParams?: ISearchParams;
};

export default function ProductsContent({ searchParams = {} }: ProductsContentProps) {
  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<ProductsGridSkeleton />}>
        <LoadErrorBoundary entity="products">
          <ProductsResults searchParams={searchParams} />
        </LoadErrorBoundary>
      </Suspense>
    </div>
  );
}

async function ProductsResults({ searchParams = {} }: ProductsContentProps) {
  const locale = await getLocale();
  const { products, metadata } = await getFilteredProducts({
    searchParams,
    options: { locale },
  });

  return (
    <>
      <ProductsGrid products={products} />
      <ProductsContentPagination metadata={metadata} />
    </>
  );
}
