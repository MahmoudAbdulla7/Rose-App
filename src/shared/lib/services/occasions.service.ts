import { routing } from '@/i18n/routing';
import { getOccasion, getOccasions } from '@/shared/lib/apis/occasions/occasions.api';
import { OCCASIONS_OPTIONS } from '@/shared/lib/apis/occasions/occasions.options';
import type { IOccasion, IOccasionResponse } from '@/shared/lib/types/occasions';
import { getSearchParam, PAGE_KEY } from '@/shared/lib/utils/filter.utils';
import { pickData } from '@/shared/lib/utils/pick-data.utils';
import { cacheLife, cacheTag } from 'next/cache';

const SEARCH_KEY = 'search';

type GetPaginatedOccasionsParams = {
  searchParams?: ISearchParams;
  options?: { locale: string };
};

export type PaginatedOccasionsResult = {
  occasions: IOccasion[];
  metadata: IPaginatedData<IOccasion>['metadata'];
};

export async function getPaginatedOccasions({
  searchParams = {},
  options = { locale: routing.defaultLocale },
}: GetPaginatedOccasionsParams = {}): Promise<PaginatedOccasionsResult> {
  'use cache';
  cacheLife(OCCASIONS_OPTIONS.CACHE_LIFE);
  cacheTag(...OCCASIONS_OPTIONS.TAGS);

  const search = getSearchParam(searchParams, SEARCH_KEY)?.trim();
  const page = getSearchParam(searchParams, PAGE_KEY);

  const response = await getOccasions(
    {
      limit: String(OCCASIONS_OPTIONS.DESKTOP_LIMIT),
      ...(page ? { [PAGE_KEY]: page } : {}),
      ...(search ? { [SEARCH_KEY]: search } : {}),
    },
    options,
  );

  if (!response?.status) {
    throw new Error(response?.message ?? 'Failed to load occasions');
  }

  const successResponse = response as Extract<IOccasionResponse, { status: true }>;

  return {
    occasions: pickData<IOccasion>(successResponse),
    metadata: successResponse.payload.metadata,
  };
}

export async function getOccasionById(
  id: string,
  options: { locale: string } = { locale: routing.defaultLocale },
): Promise<IOccasion | null> {
  'use cache';
  cacheLife(OCCASIONS_OPTIONS.CACHE_LIFE);
  cacheTag(...OCCASIONS_OPTIONS.TAGS);

  const response = await getOccasion(id, options);

  return response?.status ? response.payload.occasion : null;
}
