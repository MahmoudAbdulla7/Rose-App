import PopularProductsGridSkeleton from '@/features/landing-page/skeletons/popular-products/popular-products-grid.skeleton';
import PopularProductsOccasionsSkeleton from '@/features/landing-page/skeletons/popular-products/popular-products-occasions.skeleton';
import Skeleton from '@/shared/ui/skeleton';

export default function PopularProductsSectionSkeleton() {
  return (
    <section className="flex w-full flex-col gap-10">
      <div className="flex w-full min-w-0 flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <Skeleton className="h-9 w-48 rounded-md" />
        <PopularProductsOccasionsSkeleton />
      </div>
      <PopularProductsGridSkeleton />
    </section>
  );
}
