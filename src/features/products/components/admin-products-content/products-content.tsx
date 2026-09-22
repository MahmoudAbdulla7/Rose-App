import { getLocale } from 'next-intl/server';
import ProductsTableContent from './products-table';
import ProductsSearch from './products-search';
import Pagination from '@/shared/components/pagination';
import ProductsHeader from './products-header';
import AdminProductsTableSkeleton from '../../skeletons/products-table.skeleton';
import { Suspense } from 'react';
import { getAdminProducts } from '../../lib/services/admin-products.service';

type ProductsContentProps = {
  searchParams: Promise<ISearchParams>;
};

async function ProductsTable({ searchParams }: ProductsContentProps) {
  const locale = await getLocale();
  const resolvedSearchParams = await searchParams;

  const { products, metadata } = await getAdminProducts({
    searchParams: resolvedSearchParams,
    options: { locale },
  });

  return (
    <>
      <ProductsTableContent products={products} />
      <Pagination totalPages={metadata.totalPages} />
    </>
  );
}

export default function AdminProductsPageContent({ searchParams }: ProductsContentProps) {
  return (
    <>
      <ProductsHeader />
      <ProductsSearch />
      <Suspense fallback={<AdminProductsTableSkeleton />}>
        <ProductsTable searchParams={searchParams} />
      </Suspense>
    </>
  );
}