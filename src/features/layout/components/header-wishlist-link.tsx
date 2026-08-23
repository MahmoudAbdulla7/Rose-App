'use client';

import { Link } from '@/i18n/navigation';
import { useWishlist } from '@/shared/hooks/use-wishlist.hook';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function HeaderWishlistLink() {
  const t = useTranslations('header');
  const { isAuthenticated, guestWishlist, wishlistItems, isLoading } = useWishlist();

  const count = isAuthenticated ? wishlistItems.length : guestWishlist.length;
  const badgeLabel = count > 99 ? '99+' : String(count);

  // Only the authenticated query has a real loading state (guest count is synchronous from localStorage)
  const isCountLoading = isAuthenticated && isLoading;

  return (
    <Link
      href="/wishlist"
      className="text-ds-text-default relative min-h-11 min-w-11 p-2"
      aria-label={t('wishlist')}
    >
      <Heart className="size-5" aria-hidden="true" />
      {!isCountLoading && count > 0 && (
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
