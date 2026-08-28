import 'server-only';

import type { ICategoryResponse, ISingleCategoryResponse } from '@/shared/lib/types/categories';
import { buildApiEndpoint } from '../../utils/api-endpoint-builder.utils';
import { routing } from '@/i18n/routing';
import { API_HEADERS } from '../headers.options';
import { CATEGORIES_OPTIONS } from './categories.options';

export async function getCategories({
  searchParams,
  options = { locale: routing.defaultLocale },
}: {
  searchParams: ISearchParams;
  options: { locale: string };
}): Promise<ICategoryResponse> {
  const endpoint = buildApiEndpoint('/categories', {
    limit: String(searchParams?.limit ?? CATEGORIES_OPTIONS.DESKTOP_LIMIT),
    ...searchParams,
  });

  const response = await fetch(endpoint.toString(), {
    method: 'GET',
    headers: {
      ...API_HEADERS.ACCEPT_LANGUAGE(options.locale),
      ...API_HEADERS.JSON,
    },
  });

  return response.json() as Promise<ICategoryResponse>;
}

export async function getCategory({
  id,
  options = { locale: routing.defaultLocale },
}: {
  id: string;
  options?: { locale: string };
}): Promise<ISingleCategoryResponse> {
  const endpoint = buildApiEndpoint(`/categories/${id}`);

  const response = await fetch(endpoint.toString(), {
    method: 'GET',
    headers: {
      ...API_HEADERS.ACCEPT_LANGUAGE(options.locale),
      ...API_HEADERS.JSON,
    },
  });

  return response.json() as Promise<ISingleCategoryResponse>;
}
