import type { IProductResponse } from '../../types/product';
import { PRODUCTS_OPTIONS } from './products.options';

/** Client fetch for live header search (goes through /api/products/search). */
export async function fetchProductSearch(
  search: string,
  locale: string,
): Promise<IProductResponse> {
  const trimmed = search.trim().slice(0, PRODUCTS_OPTIONS.SEARCH_MAX_CHARS);
  const params = new URLSearchParams({ search: trimmed });

  const response = await fetch(`/api/products/search?${params.toString()}`, {
    headers: {
      'Accept-Language': locale,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to search products');
  }

  return (await response.json()) as IProductResponse;
}
