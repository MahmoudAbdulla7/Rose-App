'use client';

import { Link } from '@/i18n/navigation';
import { useCart } from '@/features/cart/hooks/use-cart';
import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function HeaderCartLink() {
  const t = useTranslations('header');
  const { data, isLoading, isPending, isFetching } = useCart();

  const hasResolvedCart =
    data != null && data.status === true && Array.isArray(data.payload?.cartItems);
  const isCartLoading = isLoading || isPending || (isFetching && !hasResolvedCart);

  // Item count (not quantity sum) keeps the badge in sync with cart query cache
  const cartCount = hasResolvedCart ? data.payload.cartItems.length : 0;

  const badgeLabel = cartCount > 99 ? '99+' : String(cartCount);

  return (
    <Link
      href="/cart"
      className="text-ds-text-default relative p-2"
      aria-label={cartCount > 0 ? t('cartWithCount', { count: cartCount }) : t('cart')}
    >
      <ShoppingCart className="size-5" />
      {!isCartLoading && cartCount > 0 && (
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
