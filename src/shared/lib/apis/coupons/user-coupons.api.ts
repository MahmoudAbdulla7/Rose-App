import type { ICouponResponse } from '../../types/coupon';

export async function fetchCouponByCode(code: string): Promise<ICouponResponse> {
  const params = new URLSearchParams({ code: code.trim() });

  const response = await fetch(`/api/coupons?${params.toString()}`);

  return (await response.json()) as ICouponResponse;
}
