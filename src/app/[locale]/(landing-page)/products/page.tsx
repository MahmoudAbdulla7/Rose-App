import ProductsContent from '@/features/products/components/products-content/products-content';
import Filters from '@/features/products/components/sidebar/filters';

type ProductsPageProps = {
  searchParams: Promise<ISearchParams>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <main className="flex-raw container flex gap-6.25 overflow-hidden py-6">
      <section className="w-1/4 rounded-lg">
        <Filters searchParams={resolvedSearchParams} />
      </section>
      <section className="w-3/4 rounded-lg">
        <ProductsContent searchParams={resolvedSearchParams} />
      </section>
    </main>
  );
}
