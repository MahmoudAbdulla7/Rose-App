'use client';

import { useCartCount } from '../lib/hooks/use-cart-count.hook';
import { Link } from '@/i18n/navigation';
import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function HeaderCartLink() {
  // Translation
  const t = useTranslations('header');

  // Cart count
  const cartCount = useCartCount();

  // Cart badge label
  const cartBadgeLabel = cartCount > 99 ? '99+' : String(cartCount);

  return (
    <Link
      href="/cart"
      className="text-ds-text-default relative p-2"
      aria-label={cartCount > 0 ? t('cartWithCount', { count: cartCount }) : t('cart')}
    >
      <ShoppingCart className="size-5" />
      <span
        className="bg-ds-primary text-ds-text-inverse absolute -inset-e-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none font-medium tabular-nums"
        aria-hidden={cartCount <= 0}
        hidden={cartCount <= 0}
      >
        {cartBadgeLabel}
      </span>
    </Link>
  );
}
