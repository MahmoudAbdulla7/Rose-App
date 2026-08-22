import 'server-only';

import type { ICoupon, ICouponsResponse } from '../../types/coupon';
import { buildApiEndpoint } from '../../utils/api-endpoint-builder.utils';
import { API_HEADERS } from '../headers.options';
import { COUPONS_OPTIONS } from './coupons.options';

export async function getCouponByCode(code: string): Promise<ICoupon | undefined> {
  const normalized = code.trim();

  const endpoint = buildApiEndpoint('/coupons', {
    search: normalized,
    isActive: 'true',
    limit: COUPONS_OPTIONS.LOOKUP_LIMIT,
  });
  const response = await fetch(endpoint.toString(), { headers: API_HEADERS.JSON });
  const coupons = (await response.json()) as ICouponsResponse;

  if (!coupons.status) {
    return undefined;
  }

  return coupons.payload.data.find(
    (coupon) => coupon.code.toLowerCase() === normalized.toLowerCase(),
  );
}
