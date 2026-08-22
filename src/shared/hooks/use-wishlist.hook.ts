'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { fetchWishlistItems } from '@/shared/lib/apis/wishlist/user-wishlist-items.api';
import { WISHLIST_OPTIONS } from '@/shared/lib/apis/wishlist/wishlist.options';
import {
  getGuestWishlistServerSnapshot,
  getGuestWishlistSnapshot,
  subscribeToGuestWishlist,
} from '@/shared/lib/services/guest-wishlist.service';
import type { WishlistSuccessResponse } from '@/shared/lib/types/wishlist';

export function useWishlist() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isSessionLoading = status === 'loading';

  const guestWishlist = useSyncExternalStore(
    subscribeToGuestWishlist,
    getGuestWishlistSnapshot,
    getGuestWishlistServerSnapshot,
  );

  const guestWishlistData = useMemo<WishlistSuccessResponse>(
    () => ({
      status: true,
      code: 200,
      message: 'Guest wishlist',
      payload: {
        wishlistItems: guestWishlist.map((product) => ({
          id: `guest-${product.id}`,
          createdAt: product.createdAt,
          userId: 'guest',
          productId: product.id,
          product,
        })),
      },
    }),
    [guestWishlist],
  );

  const { data: serverData, ...queryState } = useQuery({
    queryKey: WISHLIST_OPTIONS.getQueryKey('user'),
    queryFn: fetchWishlistItems,
    enabled: isAuthenticated,
  });

  const authenticatedData = serverData?.status ? serverData : undefined;
  const data = isSessionLoading
    ? undefined
    : isAuthenticated
      ? authenticatedData
      : guestWishlistData;
  const wishlistItems = data?.payload.wishlistItems ?? [];
  const isPending = isSessionLoading || (isAuthenticated && queryState.isPending);

  return {
    ...queryState,
    data,
    isAuthenticated,
    guestWishlist,
    wishlistItems,
    isPending,
    isLoading: isPending,
    isError: isAuthenticated && queryState.isError,
  };
}
