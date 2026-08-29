import AdminProductsPageContent from '@/features/products/components/admin-products-content/products-content';

type DashboardProductsPageProps = {
  searchParams: Promise<ISearchParams>;
};

export default function DashboardProductsPage({ searchParams }: DashboardProductsPageProps) {
  return <AdminProductsPageContent searchParams={searchParams} />;
}