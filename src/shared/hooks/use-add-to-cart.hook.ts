'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IProduct } from '@/shared/lib/types/product';
import { useCart } from './use-cart.hook';
import { addCartItem, updateCartItemQuantity } from '../lib/apis/cart/user-cart-items.api';
import { addToGuestCart } from '../lib/services/guest-cart.service';

type AddToCartInput = {
  productId: string;
  product: IProduct;
  quantity: number;
};

export function useAddToCart() {
  const { isAuthenticated, cartItems } = useCart();
  const queryClient = useQueryClient();

  const { mutate: addMutate, isPending: isAdding } = useMutation({
    mutationFn: ({ productId, quantity }: AddToCartInput) => addCartItem(productId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const { mutate: updateMutate, isPending: isUpdating } = useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) =>
      updateCartItemQuantity(cartItemId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  function mutate({ productId, product, quantity }: AddToCartInput) {
    if (isAuthenticated) {
      const matchingCartItem = cartItems.find((item) => item.productId === productId);
      if (matchingCartItem) {
        updateMutate({
          cartItemId: matchingCartItem.id,
          quantity: matchingCartItem.quantity + quantity,
        });
      } else {
        addMutate({ productId, product, quantity });
      }
    } else {
      addToGuestCart(product, quantity);
    }
  }

  return { mutate, isPending: isAdding || isUpdating };
}
