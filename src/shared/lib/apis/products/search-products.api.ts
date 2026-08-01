import 'server-only';

import type { IProductResponse } from '../../types/product';
import { routing } from '@/i18n/routing';
import { getProducts } from './product.api';
import { PRODUCTS_OPTIONS } from './products.options';

type SearchProductsParams = {
  search: string;
  options?: { locale: string };
};

/** Live header search: same getProducts API, limited results. */
export async function searchProducts({
  search,
  options = { locale: routing.defaultLocale },
}: SearchProductsParams): Promise<IProductResponse> {
  const trimmed = search.trim().slice(0, PRODUCTS_OPTIONS.SEARCH_MAX_CHARS);

  if (trimmed.length < PRODUCTS_OPTIONS.SEARCH_MIN_CHARS) {
    return {
      status: true,
      code: 200,
      message: 'OK',
      payload: {
        data: [],
        metadata: { page: 1, limit: 0, total: 0, totalPages: 0 },
      },
    };
  }

  const response = await getProducts(
    {
      search: trimmed,
      limit: PRODUCTS_OPTIONS.SEARCH_RESULTS_LIMIT.toString(),
    },
    { locale: options.locale },
  );

  if (!response) {
    return {
      status: false,
      code: 500,
      message: 'Failed to search products',
    };
  }

  return response;
}
