'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import { addWishlistItem } from '@/shared/lib/apis/wishlist/user-wishlist-items.api';
import {
  getGuestWishlistSnapshot,
  setGuestWishlist,
  clearGuestWishlist,
} from '@/shared/lib/services/guest-wishlist.service';

export function WishlistSyncProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated) return;

    const items = getGuestWishlistSnapshot();
    if (items.length === 0) return;

    let cancelled = false;

    (async () => {
      const results = await Promise.allSettled(items.map((item) => addWishlistItem(item.id)));
      if (cancelled) return;

      const failedItems = items.filter((_, i) => results[i].status === 'rejected');

      if (failedItems.length > 0) {
        // Keep only what failed, so a future login retries just those
        setGuestWishlist(failedItems);
      } else {
        // Everything synced successfully — clear localStorage entirely
        clearGuestWishlist();
      }

      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    })();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, queryClient]);

  return <>{children}</>;
}
