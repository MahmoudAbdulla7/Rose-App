import { COUPONS_TYPES } from '@/shared/lib/constants/coupons.constants';
import type { ICouponType } from '@/shared/lib/types/coupon';

type ProductPriceInput = {
  price: string;
  discountType?: ICouponType;
  discountValue?: string;
};

/**
 * Returns the display price and optional original (pre-discount) price.
 */
export function getProductDisplayPrice(args: ProductPriceInput): {
  price: number;
  originalPrice?: number;
  hasDiscount: boolean;
} {
  const { price, discountType, discountValue } = args;

  // Check if price is a number
  if (Number.isNaN(Number(price))) {
    return { price: 0, hasDiscount: false };
  }

  // Check if discount value is a number
  if (Number.isNaN(Number(discountValue))) {
    return { price: 0, hasDiscount: false };
  }

  const basePrice = Number(price);
  const discount = Number(discountValue);

  if (Number.isNaN(basePrice)) {
    return { price: 0, hasDiscount: false };
  }

  if (!discount || Number.isNaN(discount) || discount <= 0) {
    return { price: basePrice, hasDiscount: false };
  }

  // Calculate sale price
  const salePrice =
    discountType === COUPONS_TYPES.PERCENT
      ? basePrice * (1 - discount / 100)
      : basePrice - discount;

  return {
    price: Math.max(0, salePrice),
    originalPrice: basePrice,
    hasDiscount: true,
  };
}
