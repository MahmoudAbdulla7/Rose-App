'use client';

import { MoveRight, TicketPercent, X } from 'lucide-react';
import { useState, type SubmitEvent } from 'react';

import { useCart } from '@/features/cart/hooks/use-cart';
import { useApplyCoupon } from '@/features/cart/hooks/use-coupon';
import { getCartSubtotal } from '@/features/cart/lib/utils/cart.utils';
import {
  getCouponCartError,
  getCouponDiscount,
  getCouponStatusError,
  type TCouponError,
} from '@/features/cart/lib/utils/coupon.utils';
import { Link } from '@/i18n/navigation';
import type { ICoupon } from '@/shared/lib/types/coupon';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useTranslations } from 'next-intl';

type OrderSummaryProps = {
  /** Replaces the default checkout button — e.g. a "place order" submit on checkout. */
  children?: React.ReactNode;
  className?: string;
};

export default function OrderSummary({ children, className }: OrderSummaryProps) {
  // Translation
  const t = useTranslations('cart');

  // State
  const [code, setCode] = useState('');
  const [coupon, setCoupon] = useState<ICoupon | null>(null);
  const [error, setError] = useState<TCouponError | null>(null);

  // Query
  const { data, isPending: isCartPending, isError } = useCart();

  // Mutation
  const { mutate: applyCoupon, isPending } = useApplyCoupon();

  // Variables
  const cartReady = !isCartPending && !isError && data?.status === true;
  const subtotal = cartReady ? getCartSubtotal(data.payload?.cartItems ?? []) : 0;

  const couponError = getCouponCartError(coupon, subtotal);
  const formError = couponError ?? error;
  const discount = coupon && !couponError ? getCouponDiscount(coupon, subtotal) : 0;
  const total = subtotal - discount;
  const canCheckout = cartReady && subtotal > 0;

  // Functions
  const formatPrice = (price: number) => `${t('priceAmount', { price })} ${t('currency')}`;

  const handleApply = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = code.trim();
    if (!trimmed) return;

    applyCoupon(trimmed, {
      onSuccess: (response) => {
        const found = response.status ? response.payload : null;
        const statusError = getCouponStatusError(found);

        setError(statusError);

        if (!statusError) {
          setCoupon(found);
          setCode('');
        }
      },
      onError: () => setError('failed'),
    });
  };

  const handleRemoveCoupon = () => {
    setCoupon(null);
    setError(null);
  };

  return (
    <section className={cn('flex min-w-0 flex-col gap-4 md:gap-5 lg:gap-6', className)}>
      {/* Title */}
      <h2 className="text-ds-text-plain text-xl font-semibold md:text-2xl lg:text-3xl">
        {t('summary')}
      </h2>

      <div className="bg-ds-subtle flex flex-col gap-2.5 rounded-xl p-3 md:p-3.5 lg:p-4">
        {/* Coupon form */}
        <form onSubmit={handleApply} className="flex items-start gap-2 md:gap-2.5">
          <Input
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder={t('couponPlaceholder')}
            aria-label={t('couponPlaceholder')}
            error={formError ? t(`couponErrors.${formError}`) : undefined}
            wrapperClassName="flex-1"
            disabled={isPending}
          />

          <Button
            type="submit"
            variant="primary"
            loading={isPending}
            disabled={!code.trim()}
            className="px-3 text-xs md:text-sm lg:px-4"
            leftIcon={<TicketPercent className="size-4 md:size-5 lg:size-6" />}
          >
            {t('applyCoupon')}
          </Button>
        </form>

        {/* Applied coupon */}
        <div className="border-ds-border-soft flex min-h-24 flex-col items-center justify-center gap-2 rounded-md border p-2.5 text-center md:min-h-28 lg:min-h-32">
          {coupon && !couponError ? (
            <>
              <span className="bg-ds-primary-fade text-ds-primary inline-flex items-center gap-2 rounded-full py-1 ps-3 pe-1 text-sm font-medium">
                {coupon.code}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  className="rounded-full"
                  onClick={handleRemoveCoupon}
                  aria-label={t('removeCoupon')}
                >
                  <X />
                </Button>
              </span>
              <span className="text-ds-text-soft text-sm">
                {t('couponSaves', { amount: formatPrice(discount) })}
              </span>
            </>
          ) : (
            <p className="text-ds-text-muted text-base italic">{t('noCouponsApplied')}</p>
          )}
        </div>

        {/* Totals */}
        <div className="flex flex-col gap-3 p-2 md:gap-3.5 md:p-2.5 lg:gap-4">
          <div className="text-ds-text-plain flex items-center justify-between gap-3">
            <span className="text-sm font-medium md:text-base lg:text-lg">{t('subtotal')}</span>
            <span className="text-base font-semibold tabular-nums md:text-lg lg:text-xl">
              {formatPrice(subtotal)}
            </span>
          </div>

          {discount > 0 ? (
            <div className="text-ds-text-plain flex items-center justify-between gap-3">
              <span className="text-sm font-medium md:text-base lg:text-lg">{t('discount')}</span>
              <span className="text-ds-success text-base font-semibold tabular-nums md:text-lg lg:text-xl">
                -{formatPrice(discount)}
              </span>
            </div>
          ) : null}

          <hr className="border-ds-border-muted" />

          <div className="text-ds-primary flex items-center justify-between gap-3 text-lg font-bold md:text-xl lg:text-2xl">
            <span>{t('total')}</span>
            <span className="tabular-nums">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {children ?? (
        <Button
          variant="primary"
          className="h-12 w-full text-base font-medium md:h-14 md:text-lg lg:h-17 lg:text-xl"
          disabled={!canCheckout}
          render={canCheckout ? <Link href="/checkout" /> : undefined}
          rightIcon={<MoveRight className="size-4 md:size-5 lg:size-6 rtl:rotate-180" />}
        >
          {t('checkout')}
        </Button>
      )}
    </section>
  );
}
