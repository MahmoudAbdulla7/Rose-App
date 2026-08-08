'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';

import { CART_OPTIONS } from '@/shared/lib/apis/cart/cart.options';
import {
  clearCartRequest,
  fetchCartItems,
  removeCartItemRequest,
  updateCartItemRequest,
} from '@/shared/lib/apis/cart/user-cart-items.api';
import { guestCart } from '@/shared/lib/services/guest-cart.service';
import type { ICartItem, ICartResponse } from '@/shared/lib/types/cart';

export function useCart() {
  // Auth
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();
  const previousStatusRef = useRef(status);

  // Separate cache per auth scope so guest empty cart never masks the server cart
  const scope = isAuthenticated ? (session?.user?.id ?? 'user') : 'guest';

  // Reset / refresh cart cache when auth status changes
  useEffect(() => {
    const previousStatus = previousStatusRef.current;

    if (previousStatus === 'authenticated' && status === 'unauthenticated') {
      queryClient.removeQueries({ queryKey: CART_OPTIONS.QUERY_KEY });
    }

    if (previousStatus !== 'authenticated' && status === 'authenticated') {
      queryClient.invalidateQueries({ queryKey: CART_OPTIONS.QUERY_KEY });
    }

    previousStatusRef.current = status;
  }, [status, queryClient]);

  // Query
  return useQuery({
    queryKey: [...CART_OPTIONS.QUERY_KEY, scope],
    queryFn: async (): Promise<ICartResponse> => {
      if (isAuthenticated) {
        return await fetchCartItems();
      }

      // Guest fallback — IndexedDB cart while logged out
      const items = await guestCart.getAll();
      const mappedItems: ICartItem[] = items.map((item) => ({
        id: String(item.id),
        productId: item.productId,
        product: item.product,
        quantity: item.quantity,
        userId: 'guest',
        createdAt: item.addedAt,
        updatedAt: item.addedAt,
      }));

      return {
        status: true,
        code: 200,
        message: 'Guest cart',
        payload: { cartItems: mappedItems },
      };
    },
    enabled: status !== 'loading',
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateCartItem() {
  // Query
  const queryClient = useQueryClient();

  // Mutation — PATCH /api/cart/{cartItemId}
  return useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      return await updateCartItemRequest(id, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_OPTIONS.QUERY_KEY });
    },
  });
}

export function useRemoveCartItem() {
  // Query
  const queryClient = useQueryClient();

  // Mutation — DELETE /api/cart/{cartItemId}
  return useMutation({
    mutationFn: async (id: string) => {
      return await removeCartItemRequest(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_OPTIONS.QUERY_KEY });
    },
  });
}

export function useClearCart() {
  // Query
  const queryClient = useQueryClient();

  // Mutation — DELETE /api/cart
  return useMutation({
    mutationFn: async () => {
      return await clearCartRequest();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_OPTIONS.QUERY_KEY });
    },
  });
}
