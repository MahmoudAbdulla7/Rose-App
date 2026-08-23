'use client';

import { useMutation } from '@tanstack/react-query';

import { createOrderRequest } from '../lib/apis/orders.api';
import { CHECKOUT_OPTIONS } from '../lib/constants/checkout.options';

export function useCreateOrder() {
  return useMutation({
    mutationKey: CHECKOUT_OPTIONS.CREATE_ORDER_MUTATION_KEY,
    mutationFn: createOrderRequest,
  });
}
