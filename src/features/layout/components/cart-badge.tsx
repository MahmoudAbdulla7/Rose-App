'use client';

import { useCart } from '@/shared/hooks/use-cart.hook';

export function CartBadge() {
  const { cartItems, isLoading } = useCart();
  const count = cartItems !== undefined ? cartItems.length : 0;

  if (isLoading || count === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
      {count}
    </span>
  );
}
