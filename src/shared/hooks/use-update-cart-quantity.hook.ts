import { updateCartItem as serverUpdate } from '@/shared/lib/actions/cart.actions';
import { CART_OPTIONS } from '@/shared/lib/apis/cart/cart.options';
import { updateGuestCartItemQuantity } from '@/shared/lib/services/guest-cart.service';
import type { ICartItem, IUpdateCartQuantity } from '@/shared/lib/types/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { type IProduct } from '../lib/types/product';

export function useUpdateCartQuantity() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity }: IUpdateCartQuantity) => {
      if (isAuthenticated) {
        return await serverUpdate(productId, quantity);
      } else {
        await updateGuestCartItemQuantity(productId, quantity);
        // Dummy payload to satisfy the type (server would return the updated item)
        const dummyItem: ICartItem = {
          id: `guest-${Date.now()}`,
          productId,
          product: {} as IProduct,
          quantity,
          userId: 'guest',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        return {
          status: true,
          code: 200,
          message: 'Updated locally',
          payload: dummyItem,
        };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_OPTIONS.QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
