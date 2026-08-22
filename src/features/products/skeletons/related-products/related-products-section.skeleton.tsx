import ProductCardSkeleton from '@/features/landing-page/skeletons/product/product-card.skeleton';
import Skeleton from '@/shared/ui/skeleton';

const RELATED_PRODUCTS_VISIBLE_COUNT = 4;

export default function RelatedProductsSectionSkeleton() {
  return (
    <section className="my-12 w-full lg:mt-16">
      <Skeleton className="h-9 w-48 rounded-md" />

      <div className="relative mx-auto w-full max-w-7xl px-4.75">
        <div className="my-10 flex w-full gap-4 overflow-hidden">
          {Array.from({ length: RELATED_PRODUCTS_VISIBLE_COUNT }, (_, index) => (
            <ProductCardSkeleton
              key={index}
              className="mx-auto max-w-80 shrink-0 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
