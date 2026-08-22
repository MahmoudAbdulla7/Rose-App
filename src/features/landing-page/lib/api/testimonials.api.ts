import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import { routing } from '@/i18n/routing';
import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import type {
  ITestimonial,
  ITestimonialResponse,
} from '@/features/landing-page/lib/types/home/testimonials';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { pickData } from '@/shared/lib/utils/pick-data.utils';

import { TESTIMONIALS_OPTIONS } from './testimonials.options';

export async function getTestimonials(
  options: { locale: string } = { locale: routing.defaultLocale },
) {
  'use cache';
  cacheLife(TESTIMONIALS_OPTIONS.CACHE_LIFE);
  cacheTag(...TESTIMONIALS_OPTIONS.TAGS);

  const endpoint = buildApiEndpoint('/testimonials', {
    limit: String(TESTIMONIALS_OPTIONS.LANDING_PAGE_LIMIT),
  });

  const response = await fetch(endpoint.toString(), {
    method: 'GET',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.ACCEPT_LANGUAGE(options.locale),
    },
  });

  const result = (await response.json()) as ITestimonialResponse;

  if (!result?.status) {
    throw new Error(result?.message ?? 'Failed to load testimonials');
  }

  return pickData<ITestimonial>(result);
}
