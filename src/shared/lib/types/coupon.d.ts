import type { COUPONS_TYPES } from '../constants/coupons.constants';

export type ICouponType = (typeof COUPONS_TYPES)[keyof typeof COUPONS_TYPES];
