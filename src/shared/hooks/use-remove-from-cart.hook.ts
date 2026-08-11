import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { removeFromCart as serverRemove } from '@/shared/lib/actions/cart.actions';
import { removeFromGuestCart } from '@/shared/lib/services/guest-cart.service';
import { CART_OPTIONS } from '@/shared/lib/apis/cart/cart.options';
import type { IRemoveFromCart, RemoveFromCartResponse } from '@/shared/lib/types/cart';

export function useRemoveFromCart() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId }: IRemoveFromCart): Promise<RemoveFromCartResponse> => {
      if (isAuthenticated) {
        const response = await serverRemove({ productId });

        return {
          status: response.status,
          code: response.code,
          message: response.message,
          payload: null,
        };
      } else {
        await removeFromGuestCart(productId);
        return {
          status: true,
          code: 200,
          message: 'Removed locally',
          payload: null,
        };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_OPTIONS.QUERY_KEY });
    },
  });
}
