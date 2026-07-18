import { routing } from '@/i18n/routing';
import { getOccasions } from '@/shared/lib/apis/occasions/occasions.api';
import { OCCASIONS_OPTIONS } from '@/shared/lib/apis/occasions/occasions.options';
import type { IOccasion, IOccasionResponse } from '@/shared/lib/types/occasions';
import { pickData } from '@/shared/lib/utils/pick-data.utils';
import { cacheLife, cacheTag } from 'next/cache';

export async function getLandingPageOccasions(
  options: { locale: string } = { locale: routing.defaultLocale },
) {
  'use cache';
  cacheLife(OCCASIONS_OPTIONS.CACHE_LIFE);
  cacheTag(...OCCASIONS_OPTIONS.TAGS);

  const response = await getOccasions(
    { limit: String(OCCASIONS_OPTIONS.LANDING_PAGE_LIMIT) },
    options,
  );

  if (!response?.status) {
    throw new Error(response?.message ?? 'Failed to load occasions');
  }

  return pickData<IOccasion>(response as IOccasionResponse);
}
