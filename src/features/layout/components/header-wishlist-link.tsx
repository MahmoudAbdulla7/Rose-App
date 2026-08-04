'use client';

import { Link } from '@/i18n/navigation';
import { useWishlist } from '@/shared/hooks';
import { Heart } from 'lucide-react';

export default function HeaderWishlistLink() {
  const { data, isLoading } = useWishlist();

  // Count items in wishlist
  const count =
    data && 'payload' in data && data.payload?.wishlistItems
      ? data.payload.wishlistItems.length
      : 0;

  // Badge label: show 99+ if >99
  const badgeLabel = count > 99 ? '99+' : String(count);

  return (
    <Link href="/wishlist" className="text-ds-text-default relative p-1.5 sm:p-2">
      <Heart className="size-5" />
      {!isLoading && count > 0 && (
        <span
          className="bg-ds-primary text-ds-text-inverse absolute -inset-e-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none font-medium tabular-nums"
          aria-hidden="true"
        >
          {badgeLabel}
        </span>
      )}
    </Link>
  );
}
