'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { clearWishlistItems } from '@/shared/lib/apis/wishlist/user-wishlist-items.api';
import { WISHLIST_OPTIONS } from '@/shared/lib/apis/wishlist/wishlist.options';
import { clearGuestWishlist } from '@/shared/lib/services/guest-wishlist.service';
import type { RemoveFromWishlistResponse } from '@/shared/lib/types/wishlist';

export function useClearWishlist() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (status === 'loading') throw new Error('Session is still loading');

      if (isAuthenticated) {
        await clearWishlistItems();
      } else {
        clearGuestWishlist();
      }

      return {
        status: true,
        code: 200,
        message: isAuthenticated ? 'Cleared on server' : 'Cleared locally',
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
