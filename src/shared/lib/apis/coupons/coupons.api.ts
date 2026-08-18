import 'server-only';

import type { ICoupon, ICouponsResponse } from '../../types/coupon';
import { buildApiEndpoint } from '../../utils/api-endpoint-builder.utils';
import { API_HEADERS } from '../headers.options';
import { COUPONS_OPTIONS } from './coupons.options';

export async function getCoupons(page = 1, limit = COUPONS_OPTIONS.LOOKUP_LIMIT) {
  const endpoint = buildApiEndpoint('/coupons', { page: String(page), limit: String(limit) });
  const response = await fetch(endpoint.toString(), { headers: API_HEADERS.JSON });

  return (await response.json()) as ICouponsResponse;
}

export async function getCouponByCode(code: string): Promise<ICoupon | undefined> {
  const coupons = await getCoupons();
  if (!coupons.status) {
    return undefined;
  }

  const normalized = code.trim().toLowerCase();

  return coupons.payload.data.find((coupon) => coupon.code.toLowerCase() === normalized);
}
