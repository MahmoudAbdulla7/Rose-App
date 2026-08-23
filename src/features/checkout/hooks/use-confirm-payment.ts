'use client';

import { useMutation } from '@tanstack/react-query';

import { confirmPaymentRequest } from '../lib/apis/user-payments.api';
import { CHECKOUT_OPTIONS } from '../lib/constants/checkout.options';

export function useConfirmPayment() {
  return useMutation({
    mutationKey: CHECKOUT_OPTIONS.CONFIRM_PAYMENT_MUTATION_KEY,
    mutationFn: confirmPaymentRequest,
  });
}
