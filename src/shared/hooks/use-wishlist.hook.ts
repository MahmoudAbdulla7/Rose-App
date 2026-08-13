'use client';

import { useSyncExternalStore } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { fetchWishlistItems } from '@/shared/lib/apis/wishlist/user-wishlist-items.api';
import {
  subscribeToGuestWishlist,
  getGuestWishlistSnapshot,
  getGuestWishlistServerSnapshot,
} from '@/shared/lib/services/guest-wishlist.service';
import type { IWishlistItem } from '@/shared/lib/types/wishlist';

export function useWishlist() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const guestWishlist = useSyncExternalStore(
    subscribeToGuestWishlist,
    getGuestWishlistSnapshot,
    getGuestWishlistServerSnapshot,
  );

  const { data: wishlistData, ...queryState } = useQuery({
    queryKey: ['wishlist'],
    queryFn: fetchWishlistItems,
    enabled: isAuthenticated,
  });

  const wishlistItems: IWishlistItem[] = wishlistData?.status
    ? wishlistData.payload.wishlistItems
    : [];

  return { isAuthenticated, guestWishlist, wishlistItems, ...queryState };
}
