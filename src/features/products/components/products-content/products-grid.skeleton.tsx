import ProductCardSkeleton from '@/features/landing-page/skeletons/product/product-card.skeleton';
import { PRODUCTS_OPTIONS } from '@/shared/lib/apis/products/products.options';

type ProductsGridSkeletonProps = {
  limit?: number;
};

export default function ProductsGridSkeleton({
  limit = PRODUCTS_OPTIONS.PRODUCT_PAGE_LIMIT,
}: ProductsGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: limit }, (_, index) => (
        <ProductCardSkeleton key={index} className="w-full min-w-0" />
      ))}
    </div>
  );
}
