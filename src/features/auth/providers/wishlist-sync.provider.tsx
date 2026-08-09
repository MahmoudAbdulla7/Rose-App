'use client';

import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { addToWishlist as serverAdd } from '@/shared/lib/actions/wishlist.actions';
import { WISHLIST_OPTIONS } from '@/shared/lib/apis/wishlist/wishlist.options';
import { guestWishlist } from '@/shared/lib/services/guest-wishlist.service';

export function WishlistSyncProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const syncedRef = useRef(false);

  useEffect(() => {
    const syncGuestWishlist = async () => {
      if (status !== 'authenticated' || !session || syncedRef.current) return;

      const guestItems = await guestWishlist.getAll();

      if (guestItems.length === 0) {
        syncedRef.current = true;
        return;
      }

      try {
        await Promise.all(guestItems.map(({ productId }) => serverAdd({ productId })));
        await guestWishlist.clear();
        await queryClient.invalidateQueries({ queryKey: WISHLIST_OPTIONS.QUERY_KEY });
        syncedRef.current = true;
      } catch (error) {
        console.error('Wishlist sync failed:', error);
      }
    };

    void syncGuestWishlist();
  }, [queryClient, session, status]);

  return <>{children}</>;
}
