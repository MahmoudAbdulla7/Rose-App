export const CHECKOUT_OPTIONS = {
  CREATE_ORDER_MUTATION_KEY: ['orders', 'create'] as const,
  CREATE_PAYMENT_INTENT_MUTATION_KEY: ['payments', 'create-intent'] as const,
  CONFIRM_PAYMENT_MUTATION_KEY: ['payments', 'confirm'] as const,
  CHECKOUT_SESSION_QUERY_KEY: ['payments', 'checkout-session'] as const,
} as const;
