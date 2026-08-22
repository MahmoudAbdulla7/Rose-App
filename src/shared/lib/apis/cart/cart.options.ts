export const CART_OPTIONS = {
  QUERY_KEY: ['cart'] as const,
  ADD_MUTATION_KEY: ['cart', 'add'] as const,
  REMOVE_MUTATION_KEY: ['cart', 'remove'] as const,
  UPDATE_MUTATION_KEY: ['cart', 'update'] as const,
  TAGS: ['cart'] as const,
} as const;
