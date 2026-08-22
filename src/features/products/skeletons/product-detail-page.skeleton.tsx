import ProductDetailsSkeleton from '@/features/products/skeletons/product-details/product-details.skeleton';
import RelatedProductsSectionSkeleton from '@/features/products/skeletons/related-products/related-products-section.skeleton';

export default function ProductDetailPageSkeleton() {
  return (
    <>
      <ProductDetailsSkeleton />
      <div className="container mt-12 lg:mt-16">
        <RelatedProductsSectionSkeleton />
      </div>
    </>
  );
}
