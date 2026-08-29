'use client';

import { useMutation } from '@tanstack/react-query';

import { confirmPaymentAction } from '../lib/actions/payment.actions';
import { CHECKOUT_OPTIONS } from '../lib/constants/checkout.options';

export function useConfirmPayment() {
  return useMutation({
    mutationKey: CHECKOUT_OPTIONS.CONFIRM_PAYMENT_MUTATION_KEY,
    mutationFn: confirmPaymentAction,
  });
}
