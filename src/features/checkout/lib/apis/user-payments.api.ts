import { clientRequest } from '@/shared/lib/apis/client-request.api';

import type {
  ICheckoutSessionResponse,
  IConfirmPaymentPayload,
  IConfirmPaymentResponse,
  ICreatePaymentIntentResponse,
} from '../types/payment';

const PAYMENT_REQUEST_FAILED = 'Payment request failed';

export function createPaymentIntentRequest(
  orderId: string,
): Promise<ICreatePaymentIntentResponse> {
  return clientRequest<ICreatePaymentIntentResponse>(
    '/api/payments/create-intent',
    {
      method: 'POST',
      body: JSON.stringify({ orderId }),
    },
    PAYMENT_REQUEST_FAILED,
  );
}

export function confirmPaymentRequest(
  payload: IConfirmPaymentPayload,
): Promise<IConfirmPaymentResponse> {
  return clientRequest<IConfirmPaymentResponse>(
    '/api/payments/confirm',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    PAYMENT_REQUEST_FAILED,
  );
}

export function fetchCheckoutSessionRequest(sessionId: string): Promise<ICheckoutSessionResponse> {
  const params = new URLSearchParams({ session_id: sessionId });

  return clientRequest<ICheckoutSessionResponse>(
    `/api/payments/checkout-session?${params.toString()}`,
    undefined,
    PAYMENT_REQUEST_FAILED,
  );
}
