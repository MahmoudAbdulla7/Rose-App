'use client';

import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { guestWishlist } from '@/shared/lib/services/guest-wishlist.service';
import { addToWishlist as serverAdd } from '@/shared/lib/actions/wishlist.actions';
import { WISHLIST_OPTIONS } from '@/shared/lib/apis/wishlist/wishlist.options';

export function WishlistSyncProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const syncedRef = useRef(false);

  useEffect(() => {
    const syncGuestWishlist = async () => {
      if (status === 'authenticated' && session && !syncedRef.current) {
        const guestIds = await guestWishlist.getAll();
        if (guestIds.length > 0) {
          // Send each item to server
          try {
            for (const productId of guestIds) {
              await serverAdd(productId);
            }
          } catch (error) {
            console.error('Sync failed:', error);
            // Optionally, you could keep guest items and retry later
          }
          // Clear guest DB after sync attempt (even on error – we log it)
          await guestWishlist.clear();
          // Invalidate wishlist query to refetch fresh data
          queryClient.invalidateQueries({ queryKey: WISHLIST_OPTIONS.QUERY_KEY });
          syncedRef.current = true;
        }
      }
    };

    syncGuestWishlist();
  }, [status, session, queryClient]);

  return <>{children}</>;
}
