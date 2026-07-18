import 'server-only';

import type { IProductResponse } from '../../types/product';
import { buildApiEndpoint } from '../../utils/api-endpoint-builder.utils';
import { API_HEADERS } from '../headers.options';
import { PRODUCTS_OPTIONS } from './products.options';
import { routing } from '@/i18n/routing';

export async function getProducts(
  searchParams: ISearchParams = {},
  options: { locale: string } = { locale: routing.defaultLocale },
): Promise<IProductResponse | undefined> {
  const endpoint = buildApiEndpoint('/products', {
    limit: String(searchParams?.limit ?? PRODUCTS_OPTIONS.DESKTOP_LIMIT),
    ...searchParams,
  });

  const response = await fetch(endpoint.toString(), {
    method: 'GET',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.ACCEPT_LANGUAGE(options.locale),
    },
  });

  return (await response.json()) as IProductResponse;
}
