import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { guestCart } from '@/shared/lib/services/guest-cart.service';
import { CART_OPTIONS } from '@/shared/lib/apis/cart/cart.options';
import type { ICartResponse, ICartItem } from '@/shared/lib/types/cart';
import { fetchCartItems } from '../lib/apis/cart/user-cart-items.api';

export function useCart() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return useQuery({
    queryKey: CART_OPTIONS.QUERY_KEY,
    queryFn: async (): Promise<ICartResponse> => {
      if (isAuthenticated) {
        return await fetchCartItems();
      } else {
        const items = await guestCart.getAll();
        // Map to ICartItem
        const mappedItems: ICartItem[] = items.map((item) => ({
          id: String(item.id), // convert number to string
          productId: item.productId,
          product: item.product,
          quantity: item.quantity,
          userId: 'guest',
          createdAt: item.addedAt,
          updatedAt: item.addedAt,
        }));
        return {
          status: true,
          code: 200,
          message: 'Guest cart',
          payload: { cartItems: mappedItems },
        };
      }
    },
    enabled: status !== 'loading',
    staleTime: 5 * 60 * 1000,
  });
}
