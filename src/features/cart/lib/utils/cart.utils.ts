import type { ICartItem } from '@/shared/lib/types/cart';
import { getProductDisplayPrice } from '@/shared/lib/utils/product-price.utils';

export function getCartSubtotal(items: ICartItem[]): number {
  return items.reduce((sum, item) => {
    const { price } = getProductDisplayPrice({
      price: item.product.price,
      discountType: item.product.discountType,
      discountValue: item.product.discountValue,
    });

    return sum + price * item.quantity;
  }, 0);
}
