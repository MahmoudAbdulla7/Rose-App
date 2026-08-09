import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { clearWishlist as serverClear } from '@/shared/lib/actions/wishlist.actions';
import { WISHLIST_OPTIONS } from '@/shared/lib/apis/wishlist/wishlist.options';
import { guestWishlist } from '@/shared/lib/services/guest-wishlist.service';
import type {
  RemoveFromWishlistResponse,
  WishlistSuccessResponse,
} from '@/shared/lib/types/wishlist';

export function useClearWishlist() {
  const { status } = useSession();
  const queryClient = useQueryClient();
  const isAuthenticated = status === 'authenticated';
  const queryKey = WISHLIST_OPTIONS.getQueryKey(isAuthenticated ? 'user' : 'guest');

  return useMutation({
    mutationFn: async (): Promise<RemoveFromWishlistResponse> => {
      if (status === 'loading') {
        throw new Error('Session is still loading');
      }

      if (isAuthenticated) {
        return await serverClear();
      }

      await guestWishlist.clear();

      return {
        status: true,
        code: 200,
        message: 'Cleared locally',
        payload: null,
      };
    },
    onSuccess: () => {
      queryClient.setQueryData<WishlistSuccessResponse>(queryKey, (current) => {
        if (!current) return current;

        return {
          ...current,
          payload: {
            ...current.payload,
            wishlistItems: [],
          },
        };
      });
      queryClient.invalidateQueries({ queryKey: WISHLIST_OPTIONS.QUERY_KEY });
    },
  });
}
