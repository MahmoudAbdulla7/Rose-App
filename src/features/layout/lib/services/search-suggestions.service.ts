import { PRODUCTS_OPTIONS, PRODUCT_SORT_BY } from '@/shared/lib/apis/products/products.options';
import { getProducts } from '@/shared/lib/apis/products/product.api';
import type { IProduct, IProductResponse } from '@/shared/lib/types/product';
import { pickData } from '@/shared/lib/utils/pick-data.utils';
import { routing } from '@/i18n/routing';
import { cacheLife, cacheTag } from 'next/cache';
import { SORT_ORDER } from '@/shared/lib/apis/api.options';

type GetHeaderSearchSuggestionsParams = {
  options?: { locale: string };
};

/** Fetches curated product suggestions for the header search dropdown. */
export async function getHeaderSearchSuggestions({
  options = { locale: routing.defaultLocale },
}: GetHeaderSearchSuggestionsParams = {}) {
  'use cache';
  cacheLife(PRODUCTS_OPTIONS.CACHE_LIFE);
  cacheTag(...PRODUCTS_OPTIONS.SEARCH_TAGS);

  const limit = PRODUCTS_OPTIONS.SEARCH_SUGGESTIONS_LIMIT.toString();

  // Prefer a mix of best-selling and top-rated products
  const [bestSellingResponse, topRatedResponse] = await Promise.all([
    getProducts({ limit, sortBy: PRODUCT_SORT_BY.BEST_SELLING }, { locale: options.locale }),
    getProducts(
      {
        limit,
        sortBy: PRODUCT_SORT_BY.RATING,
        sortOrder: SORT_ORDER.DESC,
      },
      { locale: options.locale },
    ),
  ]);

  // Fail only if both sources are unavailable
  if (!bestSellingResponse?.status && !topRatedResponse?.status) {
    throw new Error(
      bestSellingResponse?.message ??
        topRatedResponse?.message ??
        'Failed to load product suggestions',
    );
  }

  const bestSelling = bestSellingResponse?.status
    ? pickData<IProduct>(bestSellingResponse as IProductResponse)
    : [];
  const topRated = topRatedResponse?.status
    ? pickData<IProduct>(topRatedResponse as IProductResponse)
    : [];

  // Deduplicate by id and cap at the configured suggestions limit
  const seen = new Set<string>();
  const suggestions: IProduct[] = [];

  for (const product of [...bestSelling, ...topRated]) {
    if (seen.has(product.id)) continue;
    seen.add(product.id);
    suggestions.push(product);
    if (suggestions.length >= PRODUCTS_OPTIONS.SEARCH_SUGGESTIONS_LIMIT) break;
  }

  return suggestions;
}
