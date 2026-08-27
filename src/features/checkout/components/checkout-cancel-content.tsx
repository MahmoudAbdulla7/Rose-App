'use client';

import { ArrowRight, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useCart } from '@/features/cart/hooks/use-cart';
import { getCartSubtotal } from '@/features/cart/lib/utils/cart.utils';
import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

export default function CheckoutCancelContent() {
  const t = useTranslations('checkout');
  const { data, isPending: isCartPending, isError } = useCart();

  const cartReady = !isCartPending && !isError && data?.status === true;
  const subtotal = cartReady ? getCartSubtotal(data.payload?.cartItems ?? []) : 0;
  const canCheckout = cartReady && subtotal > 0;

  const disabledReason = isCartPending
    ? t('backToCheckoutCartLoading')
    : isError || data?.status !== true
      ? t('backToCheckoutCartError')
      : t('backToCheckoutEmptyCart');

  return (
    <section className="container my-8 px-4 md:my-16">
      <div
        className={cn(
          'relative isolate flex min-h-[min(32rem,calc(100dvh-12rem))] w-full flex-col items-center justify-center overflow-hidden rounded-3xl px-6 py-16 text-center',
          'from-ds-danger-fade/30 via-ds-subtle to-ds-subtle bg-linear-to-b',
          'dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900',
          'border-ds-border-soft border',
        )}
      >
        <div
          aria-hidden="true"
          className="bg-ds-danger-fade/50 pointer-events-none absolute inset-s-1/2 top-1/3 size-72 -translate-x-1/2 rounded-full blur-3xl rtl:translate-x-1/2"
        />

        <div className="relative mb-8">
          <div
            className={cn(
              'relative flex size-20 items-center justify-center rounded-full',
              'bg-ds-danger-fade text-ds-danger',
              'ring-ds-danger-faint ring-8',
            )}
          >
            <X strokeWidth={2} className="size-9" aria-hidden="true" />
          </div>
        </div>

        <div className="relative flex max-w-lg flex-col gap-3">
          <p className="text-ds-danger/80 text-sm font-medium tracking-wide uppercase">
            {t('checkoutCancelEyebrow')}
          </p>
          <h1 className="text-ds-text-plain text-3xl font-semibold tracking-tight md:text-4xl">
            {t('checkoutCancelTitle')}
          </h1>
          <p className="text-ds-text-muted text-lg leading-relaxed">{t('checkoutCancelMessage')}</p>
        </div>

        <div className="relative mt-10 flex flex-wrap justify-center gap-3">
          <span
            className={cn('group relative inline-flex', !canCheckout && 'cursor-not-allowed')}
            aria-describedby={!canCheckout ? 'back-to-checkout-tooltip' : undefined}
          >
            <Button
              variant="primary"
              size="xl"
              className="rounded-2xl px-8"
              disabled={!canCheckout}
              rightIcon={<ArrowRight className="size-4 rtl:rotate-180" />}
              render={canCheckout ? <Link href="/checkout" /> : undefined}
            >
              {t('backToCheckout')}
            </Button>
            {!canCheckout ? (
              <span
                id="back-to-checkout-tooltip"
                role="tooltip"
                className={cn(
                  'pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-64 -translate-x-1/2',
                  'rounded-lg bg-zinc-900 px-3 py-2 text-center text-xs font-medium text-white shadow-md',
                  'opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100',
                )}
              >
                {disabledReason}
              </span>
            ) : null}
          </span>
          <Button
            variant="ghost"
            size="xl"
            className="rounded-2xl px-8"
            render={<Link href="/" />}
          >
            {t('continueShopping')}
          </Button>
        </div>
      </div>
    </section>
  );
}
