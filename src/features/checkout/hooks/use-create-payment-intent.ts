'use client';

import { useMutation } from '@tanstack/react-query';

import { createPaymentIntentRequest } from '../lib/apis/user-payments.api';
import { CHECKOUT_OPTIONS } from '../lib/constants/checkout.options';

export function useCreatePaymentIntent() {
  return useMutation({
    mutationKey: CHECKOUT_OPTIONS.CREATE_PAYMENT_INTENT_MUTATION_KEY,
    mutationFn: createPaymentIntentRequest,
  });
}
