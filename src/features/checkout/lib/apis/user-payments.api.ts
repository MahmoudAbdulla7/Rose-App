import { clientRequest } from '@/shared/lib/apis/client-request.api';

import type { ICheckoutSessionResponse } from '../types/payment';

const PAYMENT_REQUEST_FAILED = 'Payment request failed';

export function fetchCheckoutSessionRequest(sessionId: string): Promise<ICheckoutSessionResponse> {
  const params = new URLSearchParams({ session_id: sessionId });

  return clientRequest<ICheckoutSessionResponse>(
    `/api/payments/checkout-session?${params.toString()}`,
    undefined,
    PAYMENT_REQUEST_FAILED,
  );
}
