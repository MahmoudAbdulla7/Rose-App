import ProductsContent from '@/features/products/components/products-content/products-content';
import Filters from '@/features/products/components/sidebar/filters';

type ProductsPageProps = {
  searchParams: Promise<ISearchParams>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <main className="container grid grid-cols-1 gap-4 overflow-hidden py-6 sm:gap-6 sm:py-8 lg:grid-cols-[minmax(0,25%)_minmax(0,1fr)] lg:gap-6.25">
      <section className="min-w-0 lg:rounded-lg">
        <Filters searchParams={resolvedSearchParams} />
      </section>
      <section className="min-w-0 rounded-lg">
        <ProductsContent searchParams={resolvedSearchParams} />
      </section>
    </main>
  );
}
