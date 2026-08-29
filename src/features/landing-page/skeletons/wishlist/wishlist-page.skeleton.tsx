import ProductCardSkeleton from '@/features/landing-page/skeletons/product/product-card.skeleton';
import Skeleton from '@/shared/ui/skeleton';

export default function WishlistPageSkeleton() {
  return (
    <div className="container flex flex-col gap-6 pt-14 pb-10" aria-hidden="true">
      <Skeleton className="h-12 w-56 rounded-md" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
