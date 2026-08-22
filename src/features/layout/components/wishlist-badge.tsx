'use client';

import { useWishlist } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';

type WishlistBadgeProps = {
  className?: string;
  showZero?: boolean; // optionally show "0" instead of nothing
};

export function WishlistBadge({ className, showZero = false }: WishlistBadgeProps) {
  const { wishlistItems, isLoading } = useWishlist();

  // Safely extract wishlist items count from successful responses
  const count = wishlistItems !== undefined ? wishlistItems.length : 0;

  // Show nothing while loading or when count is 0 (unless showZero is true)
  if (isLoading) {
    return null; // or a shimmer/placeholder if you prefer
  }

  if (count === 0 && !showZero) {
    return null;
  }

  return (
    <span
      className={cn(
        'absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white',
        className,
      )}
      aria-label={`${count} items in wishlist`}
    >
      {count}
    </span>
  );
}
