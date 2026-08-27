'use client';

import { useMutation } from '@tanstack/react-query';

import { createOrderAction } from '../lib/actions/order.actions';
import { CHECKOUT_OPTIONS } from '../lib/constants/checkout.options';

export function useCreateOrder() {
  return useMutation({
    mutationKey: CHECKOUT_OPTIONS.CREATE_ORDER_MUTATION_KEY,
    mutationFn: createOrderAction,
  });
}
