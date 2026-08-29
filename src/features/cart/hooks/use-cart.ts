'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

import { clearCart, removeCartItem, updateCartItem } from '@/shared/lib/actions/cart.actions';
import { CART_OPTIONS } from '@/shared/lib/apis/cart/cart.options';
import { fetchCartItems } from '@/shared/lib/apis/cart/user-cart-items.api';
import {
  clearGuestCart,
  getGuestCartSnapshot,
  removeFromGuestCart,
  updateGuestCartItemQuantity,
} from '@/shared/lib/services/guest-cart.service';
import type { ICartItem, ICartResponse } from '@/shared/lib/types/cart';

function onCartMutationError(error: Error) {
  toast.error(error.message);
}

export function useCart() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();
  const previousStatusRef = useRef(status);

  const scope = isAuthenticated ? (session?.user?.id ?? 'user') : 'guest';

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

  return useQuery({
    queryKey: [...CART_OPTIONS.QUERY_KEY, scope],
    queryFn: async (): Promise<ICartResponse> => {
      if (isAuthenticated) {
        return await fetchCartItems();
      }

      const items = getGuestCartSnapshot();
      const mappedItems: ICartItem[] = items.map((item) => ({
        id: item.id || `guest-${item.productId}`,
        productId: item.productId,
        product: item.product,
        quantity: item.quantity,
        userId: 'guest',
        createdAt: item.createdAt || new Date(),
        updatedAt: item.updatedAt || new Date(),
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
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      if (isAuthenticated) {
        return updateCartItem(id, quantity);
      }

      updateGuestCartItemQuantity(id, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_OPTIONS.QUERY_KEY });
    },
    onError: onCartMutationError,
  });
}

export function useRemoveCartItem() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (isAuthenticated) {
        return removeCartItem(id);
      }

      removeFromGuestCart(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_OPTIONS.QUERY_KEY });
    },
    onError: onCartMutationError,
  });
}

export function useClearCart() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (isAuthenticated) {
        return clearCart();
      }

      clearGuestCart();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_OPTIONS.QUERY_KEY });
    },
    onError: onCartMutationError,
  });
}
