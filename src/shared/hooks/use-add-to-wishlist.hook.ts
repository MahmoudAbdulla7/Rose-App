'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { addWishlistItem } from '@/shared/lib/apis/wishlist/user-wishlist-items.api';
import { WISHLIST_OPTIONS } from '@/shared/lib/apis/wishlist/wishlist.options';
import { addToGuestWishlist } from '@/shared/lib/services/guest-wishlist.service';
import type { IProduct } from '@/shared/lib/types/product';
import type { IAddToWishlist } from '@/shared/lib/types/wishlist';

type AddToWishlistVariables = IAddToWishlist & { product?: IProduct };

export function useAddToWishlist() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, product }: AddToWishlistVariables) => {
      if (status === 'loading') throw new Error('Session is still loading');

      if (isAuthenticated) {
        const response = await addWishlistItem(productId);
        if (!response.status) throw new Error(response.message);

        return response;
      }

      if (!product) throw new Error('Product data required for guest wishlist');
      addToGuestWishlist(product);

      return {
        status: true,
        code: 200,
        message: 'Added locally',
        payload: {
          id: `guest-${productId}`,
          createdAt: product.createdAt,
          userId: 'guest',
          productId,
          product,
        },
      } as const;
    },
    onSuccess: () => {
      if (isAuthenticated) {
        void queryClient.invalidateQueries({ queryKey: WISHLIST_OPTIONS.QUERY_KEY });
      }
    },
  });
}
