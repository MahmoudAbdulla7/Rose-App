'use server';

import {
  addCartItem,
  clearCartItems,
  removeCartItem as deleteCartItem,
  updateCartItemQuantity,
} from '../apis/cart/cart.api';
import type { ICartResponse } from '../types/cart';

/**
 * Cart quantity cannot go below 1. Removing a line is a separate mutation
 * (`removeCartItem` / DELETE), not quantity 0 via PATCH (ticket Option B).
 */
const MIN_CART_QUANTITY = 1;

function assertMinQuantity(quantity: number) {
  if (!Number.isFinite(quantity) || quantity < MIN_CART_QUANTITY) {
    throw new Error('Quantity must be at least 1. Remove the item to delete it.');
  }
}

export async function addToCart(productId: string, quantity: number = 1): Promise<ICartResponse> {
  return addCartItem(productId, quantity);
}

export async function updateCartItem(id: string, quantity: number): Promise<ICartResponse> {
  assertMinQuantity(quantity);
  return updateCartItemQuantity(id, quantity);
}

export async function removeCartItem(id: string): Promise<ICartResponse> {
  return deleteCartItem(id);
}

export async function clearCart(): Promise<IAPIResponse<null>> {
  return clearCartItems();
}
