import { PAGINATION_OPTIONS } from '../pagination.options';

export const OCCASIONS_OPTIONS = {
  QUERY_KEY: ['occasions'] as const,
  TAGS: ['occasions', 'landing-page'] as const,
  CACHE_LIFE: 'days',
  HERO_LIMIT: 3,
  LANDING_PAGE_LIMIT: 4,
  DESKTOP_LIMIT: PAGINATION_OPTIONS.DESKTOP_DEFAULT_LIMIT,
  MOBILE_LIMIT: PAGINATION_OPTIONS.MOBILE_DEFAULT_LIMIT,
} as const;
