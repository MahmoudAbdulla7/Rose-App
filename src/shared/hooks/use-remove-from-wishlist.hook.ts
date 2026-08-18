import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { removeWishlistItem } from '@/shared/lib/apis/wishlist/user-wishlist-items.api';
import { removeFromGuestWishlist } from '@/shared/lib/services/guest-wishlist.service';
import { WISHLIST_OPTIONS } from '@/shared/lib/apis/wishlist/wishlist.options';
import type { RemoveFromWishlistResponse } from '@/shared/lib/types/wishlist';

type RemoveWishlistVariables = {
  id: string; // wishlist item ID (UUID) – for authenticated removal
  productId: string; // product ID – for guest removal
};

export function useRemoveFromWishlist() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      productId,
    }: RemoveWishlistVariables): Promise<RemoveFromWishlistResponse> => {
      if (isAuthenticated) {
        await removeWishlistItem(id);
        return {
          status: true,
          code: 200,
          message: 'Removed from server',
          payload: null,
        };
      } else {
        await removeFromGuestWishlist(productId);
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
