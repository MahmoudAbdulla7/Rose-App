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
  SEARCH_TAGS: ['products', 'product-search'] as const,
  CACHE_LIFE: 'hours',
  BEST_SELLING_LIMIT: 6,
  PRODUCT_PAGE_LIMIT: PAGINATION_OPTIONS.DESKTOP_DEFAULT_LIMIT,
  DESKTOP_LIMIT: PAGINATION_OPTIONS.DESKTOP_DEFAULT_LIMIT,
  MOBILE_LIMIT: PAGINATION_OPTIONS.MOBILE_DEFAULT_LIMIT,
  MAX_RATING: 5,
  SEARCH_MIN_CHARS: 2,
  SEARCH_MAX_CHARS: 200,
  SEARCH_RESULTS_LIMIT: 8,
  SEARCH_SUGGESTIONS_LIMIT: 6,
  SUGGESTED_LIMIT: 8,
  SUGGESTED_FETCH_LIMIT: 16,
} as const;

