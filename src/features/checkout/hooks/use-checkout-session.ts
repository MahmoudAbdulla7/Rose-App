'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchCheckoutSessionRequest } from '../lib/apis/user-payments.api';
import { CHECKOUT_OPTIONS } from '../lib/constants/checkout.options';

export function useCheckoutSession(sessionId: string | null) {
  return useQuery({
    queryKey: [...CHECKOUT_OPTIONS.CHECKOUT_SESSION_QUERY_KEY, sessionId],
    queryFn: () => fetchCheckoutSessionRequest(sessionId!),
    enabled: Boolean(sessionId),
    retry: false,
  });
}
