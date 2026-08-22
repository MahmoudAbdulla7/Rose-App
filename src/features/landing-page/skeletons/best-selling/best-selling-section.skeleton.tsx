import ProductCardSkeleton from '@/features/landing-page/skeletons/product/product-card.skeleton';
import { PRODUCTS_OPTIONS } from '@/shared/lib/apis/products/products.options';
import Skeleton from '@/shared/ui/skeleton';

export default function BestSellingSectionSkeleton() {
  return (
    <section className="flex w-full flex-col items-stretch gap-9 xl:flex-row">
      <div className="flex w-full flex-col gap-2.5 lg:min-w-0 lg:flex-1 lg:self-stretch">
        <Skeleton className="h-4 w-24 rounded-md" />
        <Skeleton className="h-9 w-full max-w-md rounded-md" />
        <Skeleton className="h-4 w-full max-w-sm rounded-md" />
        <Skeleton className="mt-auto h-9 w-40 rounded-xl" />
      </div>
      <div className="mx-auto flex w-full max-w-4xl gap-4 overflow-hidden xl:mx-0">
        {Array.from({ length: PRODUCTS_OPTIONS.BEST_SELLING_LIMIT }, (_, index) => (
          <ProductCardSkeleton className="mx-auto max-w-80 shrink-0" key={index} />
        ))}
      </div>
    </section>
  );
}
