'use client';

import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { guestCart } from '@/shared/lib/services/guest-cart.service';
import { addToCart as serverAdd } from '@/shared/lib/actions/cart.actions';
import { CART_OPTIONS } from '@/shared/lib/apis/cart/cart.options';

export function CartSyncProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const syncedRef = useRef(false);

  useEffect(() => {
    const syncGuestCart = async () => {
      if (status === 'authenticated' && session && !syncedRef.current) {
        const guestItems = await guestCart.getAll();
        if (guestItems.length > 0) {
          // Send each item to server
          try {
            for (const item of guestItems) {
              await serverAdd({ productId: item.productId, quantity: item.quantity });
            }
          } catch (error) {
            console.error('Sync failed:', error);
            // Optionally, you could keep guest items and retry later
          }
          // Clear guest DB after sync attempt (even on error – we log it)
          await guestCart.clear();
          // Invalidate Cart query to refetch fresh data
          queryClient.invalidateQueries({ queryKey: CART_OPTIONS.QUERY_KEY });
          syncedRef.current = true;
        }
      }
    };

    syncGuestCart();
  }, [status, session, queryClient]);

  return <>{children}</>;
}
