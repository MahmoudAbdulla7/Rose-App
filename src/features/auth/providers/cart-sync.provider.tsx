'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import {
  clearGuestCart,
  getGuestCartSnapshot,
  setGuestCart,
} from '@/shared/lib/services/guest-cart.service';
import { addCartItem } from '@/shared/lib/apis/cart/user-cart-items.api';

export function CartSyncProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated) return;

    const items = getGuestCartSnapshot();
    if (items.length === 0) return;

    let cancelled = false;

    (async () => {
      const results = await Promise.allSettled(
        items.map((item) => addCartItem(item.productId, item.quantity)),
      );
      if (cancelled) return;

      const failedItems = items.filter((_, i) => results[i].status === 'rejected');

      if (failedItems.length > 0) {
        setGuestCart(failedItems);
      } else {
        clearGuestCart();
      }

      queryClient.invalidateQueries({ queryKey: ['cart'] });
    })();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, queryClient]);

  return <>{children}</>;
}
