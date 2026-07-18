import { PAGINATION_OPTIONS } from '../pagination.options';

export const PRODUCTS_OPTIONS = {
  QUERY_KEY: ['products'] as const,
  TAGS: ['products'] as const,
  BEST_SELLING_TAGS: ['products', 'best-selling'] as const,
  POPULAR_PRODUCTS_TAGS: ['products', 'popular-products'] as const,
  CACHE_LIFE: 'hours',
  BEST_SELLING_LIMIT: 6,
  DESKTOP_LIMIT: PAGINATION_OPTIONS.DESKTOP_DEFAULT_LIMIT,
  MOBILE_LIMIT: PAGINATION_OPTIONS.MOBILE_DEFAULT_LIMIT,
} as const;
