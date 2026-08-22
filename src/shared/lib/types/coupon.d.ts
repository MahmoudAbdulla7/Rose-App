import type { COUPONS_TYPES } from '../constants/coupons.constants';

export type ICouponType = (typeof COUPONS_TYPES)[keyof typeof COUPONS_TYPES];

export interface ICoupon extends IDBFields {
  code: string;
  type: ICouponType;
  value: string;
  minPurchase: string | null;
  maxDiscount: string | null;
  usageLimit: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  immutable: boolean;
}

export type ICouponsResponse = IAPIResponse<IPaginatedData<ICoupon>>;
export type ICouponResponse = IAPIResponse<ICoupon>;
