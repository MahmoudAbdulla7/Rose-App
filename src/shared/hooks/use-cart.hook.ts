'use client';

import { useSyncExternalStore } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import type { ICartItem } from '../lib/types/cart';
import { fetchCartItems } from '../lib/apis/cart/user-cart-items.api';
import {
  getGuestCartServerSnapshot,
  getGuestCartSnapshot,
  subscribeToGuestCart,
} from '../lib/services/guest-cart.service';

export function useCart() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const guestCartList = useSyncExternalStore(
    subscribeToGuestCart,
    getGuestCartSnapshot,
    getGuestCartServerSnapshot,
  );

  const { data: cartData, ...queryState } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCartItems,
    enabled: isAuthenticated,
  });

  const cartItems: ICartItem[] = cartData?.status ? cartData.payload.cartItems : [];

  return { isAuthenticated, guestCartList, cartItems, ...queryState };
}
