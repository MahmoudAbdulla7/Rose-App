import 'server-only';

import type { IProductResponse, IProductSearchParams } from '../../types/product';
import { buildApiEndpoint } from '../../utils/api-endpoint-builder.utils';
import { API_HEADERS } from '../headers.options';
import { PRODUCTS_OPTIONS } from './products.options';
import { routing } from '@/i18n/routing';
import { cacheLife } from 'next/cache';

export async function getProducts(
  searchParams: Partial<IProductSearchParams> = {},
  options: { locale: string } = { locale: routing.defaultLocale },
): Promise<IProductResponse | undefined> {
  "use cache";
  cacheLife("hours");

  const params = {
    limit: (searchParams?.limit ?? PRODUCTS_OPTIONS.DESKTOP_LIMIT).toString(),
    ...searchParams,
  };
  const endpoint = buildApiEndpoint('/products', params);

  const response = await fetch(endpoint.toString(), {
    method: 'GET',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.ACCEPT_LANGUAGE(options.locale),
    },
  });

  return (await response.json()) as IProductResponse;
}
