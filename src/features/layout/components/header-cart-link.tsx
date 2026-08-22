'use client';

import { Link } from '@/i18n/navigation';
import { useCart } from '@/shared/hooks';
import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function HeaderCartLink() {
  const t = useTranslations('header');
  const { isAuthenticated, guestCartList, cartItems, isLoading } = useCart();

  const cartCount = isAuthenticated ? cartItems.length : guestCartList.length;

  const badgeLabel = cartCount > 99 ? '99+' : String(cartCount);
  const isCountLoading = isAuthenticated && isLoading;

  return (
    <Link
      href="/cart"
      className="text-ds-text-default relative p-2"
      aria-label={cartCount > 0 ? t('cartWithCount', { count: cartCount }) : t('cart')}
    >
      <ShoppingCart className="size-5" />
      {!isCountLoading && cartCount > 0 && (
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
