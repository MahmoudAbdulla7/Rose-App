import CartContent from '@/features/cart/components/cart-content';
import ProductsYouMayLike from '@/features/cart/components/products-you-may-like';

export const instant = false;

export default function CartPage() {
  return (
    <div className="flex flex-col gap-12 py-6 sm:py-8">
      <CartContent />
      <ProductsYouMayLike />
    </div>
  );
}
