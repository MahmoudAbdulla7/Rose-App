import { PAGINATION_OPTIONS } from '../api.options';

export const CATEGORIES_OPTIONS = {
  QUERY_KEY: ['categories'] as const,
  TAGS: ['categories', 'products'] as const,
  CACHE_LIFE: 'days',
  FILTERS_LIMIT: '10',
  DESKTOP_LIMIT: PAGINATION_OPTIONS.DESKTOP_DEFAULT_LIMIT,
  MOBILE_LIMIT: PAGINATION_OPTIONS.MOBILE_DEFAULT_LIMIT,
} as const;
