import type { ICheckoutSessionResult } from '../types/payment';

export function isCheckoutSessionSuccessful(payload: ICheckoutSessionResult): boolean {
  return (
    payload.paymentStatus === 'paid' &&
    payload.sessionStatus === 'complete' &&
    (payload.order.paymentStatus === 'SUCCEEDED' || payload.order.paymentStatus === 'SUCCESSED')
  );
}
