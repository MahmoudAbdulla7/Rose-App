import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { fetchWishlistItems } from '@/shared/lib/apis/wishlist/user-wishlist-items.api';
import { guestWishlist } from '@/shared/lib/services/guest-wishlist.service';
import { WISHLIST_OPTIONS } from '@/shared/lib/apis/wishlist/wishlist.options';
import type { WishlistSuccessResponse } from '@/shared/lib/types/wishlist';

export function useWishlist() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryKey = WISHLIST_OPTIONS.getQueryKey(isAuthenticated ? 'user' : 'guest');

  return useQuery({
    queryKey,
    queryFn: async (): Promise<WishlistSuccessResponse> => {
      if (isAuthenticated) {
        return await fetchWishlistItems();
      } else {
        const guestItems = await guestWishlist.getAll();
        const wishlistItems = guestItems.map(({ productId, product }) => ({
          id: `guest-${productId}`,
          createdAt: new Date(),
          userId: 'guest',
          productId,
          product,
        }));
        return {
          status: true,
          code: 200,
          message: 'Guest wishlist',
          payload: { wishlistItems },
        };
      }
    },
    enabled: status !== 'loading',
    staleTime: 5 * 60 * 1000,
  });
}
