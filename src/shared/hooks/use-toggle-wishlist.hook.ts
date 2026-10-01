'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addWishlistItem,
  removeWishlistItem,
} from '@/shared/lib/apis/wishlist/user-wishlist-items.api';
import {
  addToGuestWishlist,
  removeFromGuestWishlist,
} from '@/shared/lib/services/guest-wishlist.service';
import { useWishlist } from './use-wishlist.hook';
import type { IProduct } from '@/shared/lib/types/product';

export function useToggleWishlist(product: IProduct) {
  const { isAuthenticated, guestWishlist, wishlistItems } = useWishlist();
  const queryClient = useQueryClient();

  const matchingWishlistItem = wishlistItems.find((item) => item.productId === product.id);
  const isGuestWishlisted = guestWishlist.some((item) => item.id === product.id);
  const isWishlisted = isAuthenticated ? Boolean(matchingWishlistItem) : isGuestWishlisted;

  const { mutate: addMutate, isPending: isAdding } = useMutation({
    mutationFn: () => addWishlistItem(product.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  const { mutate: removeMutate, isPending: isRemoving } = useMutation({
    mutationFn: (wishlistItemId: string) => removeWishlistItem(wishlistItemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  function toggle() {
    if (isAuthenticated) {
      if (isWishlisted && matchingWishlistItem) {
        removeMutate(matchingWishlistItem.id);
      } else {
        addMutate();
      }
    } else {
      if (isGuestWishlisted) {
        removeFromGuestWishlist(product.id);
      } else {
        addToGuestWishlist(product);
      }
    }
  }

  return { isWishlisted, toggle, isPending: isAdding || isRemoving };
}
