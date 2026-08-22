'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { removeWishlistItem } from '@/shared/lib/apis/wishlist/user-wishlist-items.api';
import { WISHLIST_OPTIONS } from '@/shared/lib/apis/wishlist/wishlist.options';
import { removeFromGuestWishlist } from '@/shared/lib/services/guest-wishlist.service';
import type { RemoveFromWishlistResponse } from '@/shared/lib/types/wishlist';

type RemoveWishlistVariables = {
  id: string;
  productId: string;
};

export function useRemoveFromWishlist() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, productId }: RemoveWishlistVariables) => {
      if (status === 'loading') throw new Error('Session is still loading');

      if (isAuthenticated) {
        await removeWishlistItem(id);
      } else {
        removeFromGuestWishlist(productId);
      }

      return {
        status: true,
        code: 200,
        message: isAuthenticated ? 'Removed from server' : 'Removed locally',
        payload: null,
      } satisfies RemoveFromWishlistResponse;
    },
    onSuccess: () => {
      if (isAuthenticated) {
        void queryClient.invalidateQueries({ queryKey: WISHLIST_OPTIONS.QUERY_KEY });
      }
    },
  });
}
