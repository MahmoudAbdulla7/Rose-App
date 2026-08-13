'use client';

import { useCart } from '@/features/cart/hooks/use-cart';

export function CartBadge() {
  const { data, isLoading } = useCart();
  const cartItems = data && data.status === true ? data.payload.cartItems : [];
  const count = cartItems.length;

  if (isLoading || count === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
      {count}
    </span>
  );
}
