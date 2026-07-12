import ProductCard from '@/features/landing-page/components/product-card';
import { PRODUCT_CARD_DUMMY_DATA } from '@/features/landing-page/lib/constants/product.constant';
import ProductCardSkeleton from '@/features/landing-page/skeletons/product-card.skeleton';

export default async function LandingPage() {
  return (
    <div className="space-y-4 p-2">
      <ProductCard product={PRODUCT_CARD_DUMMY_DATA} />

      <ProductCardSkeleton />
    </div>
  );
}
