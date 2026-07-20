import ProductCardSkeleton from '@/features/landing-page/skeletons/product/product-card.skeleton';
import { PRODUCTS_OPTIONS } from '@/shared/lib/apis/products/products.options';

export interface IPopularProductsGridSkeletonProps {
  limit?: number;
}

export default function PopularProductsGridSkeleton({
  limit = PRODUCTS_OPTIONS.DESKTOP_LIMIT,
}: IPopularProductsGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-6 self-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: limit }, (_, index) => (
        <ProductCardSkeleton className="w-full md:min-w-85" key={index} />
      ))}
    </div>
  );
}
