import { routing } from '@/i18n/routing';
import { getCategories } from '@/shared/lib/apis/categories/categories.api';
import { CATEGORIES_OPTIONS } from '@/shared/lib/apis/categories/categories.options';
import type { ICategory, ICategoryResponse } from '@/shared/lib/types/categories';
import { getSearchParam, PAGE_KEY } from '@/shared/lib/utils/filter.utils';
import { pickData } from '@/shared/lib/utils/pick-data.utils';
import { cacheLife, cacheTag } from 'next/cache';

const SEARCH_KEY = 'search';

type GetLandingPageCategoriesParams = {
  searchParams?: ISearchParams;
  options?: { locale: string };
};

export type LandingPageCategoriesResult = {
  categories: ICategory[];
  metadata: IPaginatedData<ICategory>['metadata'];
};

export async function getLandingPageCategories({
  searchParams = {},
  options = { locale: routing.defaultLocale },
}: GetLandingPageCategoriesParams = {}): Promise<LandingPageCategoriesResult> {
  'use cache';
  cacheLife(CATEGORIES_OPTIONS.CACHE_LIFE);
  cacheTag(...CATEGORIES_OPTIONS.TAGS);

  const search = getSearchParam(searchParams, SEARCH_KEY)?.trim();
  const page = getSearchParam(searchParams, PAGE_KEY);

  const response = await getCategories({
    searchParams: {
      limit: String(CATEGORIES_OPTIONS.DESKTOP_LIMIT),
      ...(page ? { [PAGE_KEY]: page } : {}),
      ...(search ? { [SEARCH_KEY]: search } : {}),
    },
    options,
  });

  if (!response?.status) {
    throw new Error(response?.message ?? 'Failed to load categories');
  }

  const successResponse = response as Extract<ICategoryResponse, { status: true }>;

  return {
    categories: pickData<ICategory>(successResponse),
    metadata: successResponse.payload.metadata,
  };
}
