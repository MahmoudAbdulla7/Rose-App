export const WISHLIST_OPTIONS = {
  QUERY_KEY: ['wishlist'] as const,
  getQueryKey: (scope: 'guest' | 'user') => ['wishlist', scope] as const,
  ADD_MUTATION_KEY: ['wishlist', 'add'] as const,
  REMOVE_MUTATION_KEY: ['wishlist', 'remove'] as const,
  TAGS: ['wishlist'] as const,
} as const;
