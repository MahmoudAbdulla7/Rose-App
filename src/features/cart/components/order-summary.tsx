'use client';

import { useState, type SubmitEvent } from 'react';
import { MoveRight, TicketPercent, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useApplyCoupon } from '@/features/cart/hooks/use-coupon';
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

type OrderSummaryProps = {
  subtotal: number;
  checkoutDisabled?: boolean;
  className?: string;
};

export default function OrderSummary({
  subtotal,
  checkoutDisabled = false,
  className,
}: OrderSummaryProps) {
  // Translation
  const t = useTranslations('cart');

  // State
  const [code, setCode] = useState('');
  const [coupon, setCoupon] = useState<ICoupon | null>(null);
  const [error, setError] = useState<TCouponError | null>(null);

  // Mutation
  const { mutate: applyCoupon, isPending } = useApplyCoupon();

  // Derived State — the cart check re-runs every render, so editing the cart
  // can't leave a stale discount applied.
  const couponError = getCouponCartError(coupon, subtotal) ?? error;
  const discount = coupon && !couponError ? getCouponDiscount(coupon, subtotal) : 0;
  const total = subtotal - discount;
  const canCheckout = !checkoutDisabled && subtotal > 0;

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
        setCoupon(statusError ? null : found);

        if (!statusError) {
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
    <section className={cn('flex min-w-0 flex-col gap-6', className)}>
      {/* Title */}
      <h2 className="text-ds-text-plain text-2xl font-semibold sm:text-3xl">{t('summary')}</h2>

      <div className="bg-ds-subtle flex flex-col gap-2.5 rounded-xl p-4">
        {/* Coupon form */}
        <form onSubmit={handleApply} className="flex items-start gap-2.5">
          <Input
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder={t('couponPlaceholder')}
            aria-label={t('couponPlaceholder')}
            error={couponError ? t(`couponErrors.${couponError}`) : undefined}
            wrapperClassName="flex-1"
            disabled={isPending}
          />

          <Button
            type="submit"
            variant="primary"
            loading={isPending}
            disabled={!code.trim()}
            leftIcon={<TicketPercent className="size-6" />}
          >
            {t('applyCoupon')}
          </Button>
        </form>

        {/* Applied coupon */}
        <div className="border-ds-border-soft flex min-h-32 flex-col items-center justify-center gap-2 rounded-md border p-2.5 text-center">
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
        <div className="flex flex-col gap-4 p-2.5">
          <div className="text-ds-text-plain flex items-center justify-between gap-3">
            <span className="text-lg font-medium">{t('subtotal')}</span>
            <span className="text-xl font-semibold tabular-nums">{formatPrice(subtotal)}</span>
          </div>

          {discount > 0 ? (
            <div className="text-ds-text-plain flex items-center justify-between gap-3">
              <span className="text-lg font-medium">{t('discount')}</span>
              <span className="text-ds-success text-xl font-semibold tabular-nums">
                -{formatPrice(discount)}
              </span>
            </div>
          ) : null}

          <hr className="border-ds-border-muted" />

          <div className="text-ds-primary flex items-center justify-between gap-3 text-2xl font-bold">
            <span>{t('total')}</span>
            <span className="tabular-nums">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <Button
        variant="primary"
        className="h-17 w-full text-xl font-medium"
        disabled={!canCheckout}
        render={canCheckout ? <Link href="/checkout" /> : undefined}
        rightIcon={<MoveRight className="size-6 rtl:rotate-180" />}
      >
        {t('checkout')}
      </Button>
    </section>
  );
}
