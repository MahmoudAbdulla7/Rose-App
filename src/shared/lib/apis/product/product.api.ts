import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { routing } from '@/i18n/routing';
import { buildApiEndpoint } from '../../utils/api-endpoint-builder.utils';
import { API_HEADERS } from '../headers.options';
import { PRODUCT_OPTIONS } from './product.options';
import type { ISingleProduct, ISingleProductResponse } from '../../types/single-product';

export async function getProduct(
  id: string,
  options: { locale: string } = { locale: routing.defaultLocale },
): Promise<ISingleProduct | undefined> {
  'use cache';
  cacheLife(PRODUCT_OPTIONS.CACHE_LIFE);
  cacheTag(...PRODUCT_OPTIONS.TAGS, id);

  const endpoint = buildApiEndpoint(`/products/${id}`);

  const response = await fetch(endpoint.toString(), {
    method: 'GET',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.ACCEPT_LANGUAGE(options.locale),
    },
  });

  const data: ISingleProductResponse = await response.json();
  if (!data.status) return undefined;

  const product = data.payload.product;

  if (typeof product.gallery === 'string') {
    try {
      product.gallery = JSON.parse(product.gallery);
    } catch {
      product.gallery = [];
    }
  }

  return product;
}
