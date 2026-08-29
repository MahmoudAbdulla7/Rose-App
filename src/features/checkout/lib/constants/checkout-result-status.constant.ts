export const CHECKOUT_RESULT_STATUS = {
  SUCCESS: 'success',
  CANCEL: 'cancel',
} as const;

export type CheckoutResultStatus =
  (typeof CHECKOUT_RESULT_STATUS)[keyof typeof CHECKOUT_RESULT_STATUS];

export const CHECKOUT_RESULT_STATUSES = Object.values(CHECKOUT_RESULT_STATUS);

export function isCheckoutResultStatus(value: string): value is CheckoutResultStatus {
  return (CHECKOUT_RESULT_STATUSES as readonly string[]).includes(value);
}
