import { PAGINATION_OPTIONS } from '../api.options';

export const PRODUCT_SORT_BY = {
  PRICE: 'price',
  RATING: 'rating',
  TITLE: 'title',
  CREATED_AT: 'createdAt',
  BEST_SELLING: 'bestSelling',
  MOST_POPULAR: 'mostPopular',
} as const;

export const PRODUCTS_OPTIONS = {
  QUERY_KEY: ['products'] as const,
  TAGS: ['products'] as const,
  BEST_SELLING_TAGS: ['products', 'best-selling'] as const,
  POPULAR_PRODUCTS_TAGS: ['products', 'popular-products'] as const,
  CACHE_LIFE: 'hours',
  BEST_SELLING_LIMIT: 6,
  PRODUCT_PAGE_LIMIT: PAGINATION_OPTIONS.DESKTOP_DEFAULT_LIMIT,
  DESKTOP_LIMIT: PAGINATION_OPTIONS.DESKTOP_DEFAULT_LIMIT,
  MOBILE_LIMIT: PAGINATION_OPTIONS.MOBILE_DEFAULT_LIMIT,
  MAX_RATING: 5,
} as const;
