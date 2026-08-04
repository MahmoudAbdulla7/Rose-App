import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { guestCart } from '@/shared/lib/services/guest-cart.service';
import type { IAddToCart, AddToCartResponse } from '@/shared/lib/types/cart';
import type { IProduct } from '@/shared/lib/types/product';
import { CART_OPTIONS } from '../lib/apis/cart/cart.options';
import { addToCart as serverAdd } from '@/shared/lib/actions/cart.actions';

type AddToCartVariables = IAddToCart & { product: IProduct };

export function useAddToCart() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity = 1,
      product,
    }: AddToCartVariables): Promise<AddToCartResponse> => {
      if (isAuthenticated) {
        return await serverAdd({ productId, quantity });
      } else {
        await guestCart.add(productId, product, quantity);
        return {
          status: true,
          code: 200,
          message: 'Added locally',
          payload: {
            productId,
            quantity,
            product,
          },
        } as AddToCartResponse;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_OPTIONS.QUERY_KEY });
    },
  });
}
