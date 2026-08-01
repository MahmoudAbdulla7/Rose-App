import { removeFromWishlist as serverRemove } from '@/shared/lib/actions/wishlist.actions';
import { WISHLIST_OPTIONS } from '@/shared/lib/apis/wishlist/wishlist.options';
import { guestWishlist } from '@/shared/lib/services/guest-wishlist.service';
import type { IRemoveFromWishlist, RemoveFromWishlistResponse } from '@/shared/lib/types/wishlist';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export function useRemoveFromWishlist() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId }: IRemoveFromWishlist): Promise<RemoveFromWishlistResponse> => {
      if (isAuthenticated) {
        const response = await serverRemove({ productId });

        return {
          status: response.status,
          code: response.code,
          message: response.message,
          payload: null,
        };
      } else {
        await guestWishlist.remove(productId);

        return {
          status: true,
          code: 200,
          message: 'Removed locally',
          payload: null,
        };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_OPTIONS.QUERY_KEY });
    },
  });
}
