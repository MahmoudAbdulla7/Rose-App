import ProductsGridSkeleton from '@/features/products/components/products-content/products-grid.skeleton';
import FiltersSkeleton from '@/features/products/skeletons/sidebar/filters.skeleton';

export default function ProductsPageSkeleton() {
  return (
    <main className="container grid grid-cols-1 gap-4 overflow-hidden py-6 sm:gap-6 sm:py-8 lg:grid-cols-[minmax(0,25%)_minmax(0,1fr)] lg:gap-6.25">
      <section className="min-w-0 lg:rounded-lg">
        <FiltersSkeleton />
      </section>
      <section className="flex min-w-0 flex-col rounded-lg">
        <div className="flex h-full min-h-0 flex-col gap-6">
          <ProductsGridSkeleton />
        </div>
      </section>
    </main>
  );
}
