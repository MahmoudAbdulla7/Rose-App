'use client';

import { useMutation } from '@tanstack/react-query';

import { COUPONS_OPTIONS } from '@/shared/lib/apis/coupons/coupons.options';
import { fetchCouponByCode } from '@/shared/lib/apis/coupons/user-coupons.api';

export function useApplyCoupon() {
  return useMutation({
    mutationKey: COUPONS_OPTIONS.APPLY_MUTATION_KEY,
    mutationFn: async (code: string) => {
      return await fetchCouponByCode(code);
    },
  });
}
