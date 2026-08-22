import type { ICoupon } from '@/shared/lib/types/coupon';
import { getProductDisplayPrice } from '@/shared/lib/utils/product-price.utils';

export type TCouponError = 'notFound' | 'invalid' | 'minPurchase' | 'failed';

export function getCouponStatusError(coupon: ICoupon | null): TCouponError | null {
  if (!coupon) return 'notFound';

  const now = Date.now();
  const started = now >= Date.parse(coupon.validFrom);
  const expired = now > Date.parse(coupon.validUntil);
  const usedUp = coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit;

  return coupon.isActive && started && !expired && !usedUp ? null : 'invalid';
}

export function getCouponCartError(coupon: ICoupon | null, subtotal: number): TCouponError | null {
  const minPurchase = Number(coupon?.minPurchase);

  return coupon && subtotal < minPurchase ? 'minPurchase' : null;
}

export function getCouponDiscount(coupon: ICoupon, subtotal: number): number {
  const { price } = getProductDisplayPrice({
    price: String(subtotal),
    discountType: coupon.type,
    discountValue: coupon.value,
  });

  const cap = Number(coupon.maxDiscount) || Infinity;

  return Math.min(subtotal - price, cap);
}
