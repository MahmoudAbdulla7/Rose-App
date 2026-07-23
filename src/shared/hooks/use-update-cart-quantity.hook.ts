import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { updateCartQuantity as serverUpdate } from '@/shared/lib/actions/cart.actions';
import { guestCart } from '@/shared/lib/services/guest-cart.service';
import { CART_OPTIONS } from '@/shared/lib/apis/cart/cart.options';
import type { IUpdateCartQuantity, UpdateCartQuantityResponse } from '@/shared/lib/types/cart';

export function useUpdateCartQuantity() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: IUpdateCartQuantity): Promise<UpdateCartQuantityResponse> => {
      if (isAuthenticated) {
        return await serverUpdate({ productId, quantity });
      } else {
        await guestCart.updateQuantity(productId, quantity);
        return {
          status: true,
          code: 200,
          message: 'Updated locally',
          payload: null,
        };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_OPTIONS.QUERY_KEY });
    },
  });
}
