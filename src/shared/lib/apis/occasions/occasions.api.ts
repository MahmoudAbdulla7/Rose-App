import 'server-only';

import type { IOccasionResponse } from '@/shared/lib/types/occasions';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';

import { routing } from '@/i18n/routing';
import { API_HEADERS } from '../headers.options';
import { OCCASIONS_OPTIONS } from './occasions.options';

export async function getOccasions(
  searchParams: ISearchParams = {},
  options: { locale: string } = { locale: routing.defaultLocale },
): Promise<IOccasionResponse | undefined> {
  const endpoint = buildApiEndpoint('/occasions', {
    limit: String(searchParams?.limit ?? OCCASIONS_OPTIONS.DESKTOP_LIMIT),
    ...searchParams,
  });

  const response = await fetch(endpoint.toString(), {
    method: 'GET',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.ACCEPT_LANGUAGE(options.locale),
    },
  });

  return (await response.json()) as IOccasionResponse;
}
