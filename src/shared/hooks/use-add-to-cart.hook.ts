'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import type { IProduct } from '@/shared/lib/types/product';
import { addToCart as addToCartAction, updateCartItem } from '@/shared/lib/actions/cart.actions';
import { getProductStock } from '@/shared/lib/utils/product-stock.utils';
import { useCart } from './use-cart.hook';
import { addToGuestCart } from '../lib/services/guest-cart.service';

type AddToCartInput = {
  productId: string;
  product: IProduct;
  quantity: number;
};

function onCartMutationError(error: Error) {
  toast.error(error.message);
}

export function useAddToCart() {
  const t = useTranslations('cart');
  const { isAuthenticated, cartItems, guestCartList } = useCart();
  const queryClient = useQueryClient();

  const { mutate: addMutate, isPending: isAdding } = useMutation({
    mutationFn: ({ productId, quantity }: AddToCartInput) => addToCartAction(productId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
    onError: onCartMutationError,
  });

  const { mutate: updateMutate, isPending: isUpdating } = useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) =>
      updateCartItem(cartItemId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
    onError: onCartMutationError,
  });

  function mutate({ productId, product, quantity }: AddToCartInput) {
    const stock = getProductStock(product.stock);
    const currentQuantity = isAuthenticated
      ? (cartItems.find((item) => item.productId === productId)?.quantity ?? 0)
      : (guestCartList.find((item) => item.productId === productId)?.quantity ?? 0);

    if (currentQuantity + quantity > stock) {
      toast.error(t('maxStockReached', { count: stock }));
      return;
    }

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
