import { routing } from '@/i18n/routing';
import { getCategories } from '@/shared/lib/apis/categories/categories.api';
import { CATEGORIES_OPTIONS } from '@/shared/lib/apis/categories/categories.options';
import type { ICategory, ICategoryResponse } from '@/shared/lib/types/categories';
import { pickData } from '@/shared/lib/utils/pick-data.utils';
import { cacheLife, cacheTag } from 'next/cache';

export async function getProductsPageCategories(
  options: { locale: string } = { locale: routing.defaultLocale },
) {
  'use cache';
  cacheLife(CATEGORIES_OPTIONS.CACHE_LIFE);
  cacheTag(...CATEGORIES_OPTIONS.TAGS);

  const response = await getCategories({
    searchParams: { limit: CATEGORIES_OPTIONS.FILTERS_LIMIT },
    options,
  });

  if (!response?.status) {
    throw new Error(response?.message ?? 'Failed to load categories');
  }

  return pickData<ICategory>(response as ICategoryResponse);
}
