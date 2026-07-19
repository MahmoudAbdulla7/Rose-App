import type { IWishlistItem } from '../types/wishlist';

export function createOptimisticWishlistItem(productId: string): IWishlistItem {
  return {
    id: `optimistic-${productId}`,
    productId,
    userId: '',
    createdAt: new Date(),
    product: {} as IWishlistItem['product'],
  };
}
