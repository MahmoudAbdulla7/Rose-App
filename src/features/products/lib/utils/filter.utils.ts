import type { IProductSearchParams } from '@/shared/lib/types/product';
import { getSearchParam, PAGE_KEY } from '@/shared/lib/utils/filter.utils';

export {
  buildFilterHref,
  clearFilterHref,
  getSearchParam,
  isFilterActive,
  setFilterHref,
  setFiltersHref,
} from '@/shared/lib/utils/filter.utils';

export const PRODUCT_FILTER_KEYS = {
  CATEGORY: 'categoryId',
  OCCASION: 'occasionId',
  MIN_RATING: 'minRating',
  MIN_PRICE: 'minPrice',
  MAX_PRICE: 'maxPrice',
} as const;

export const PRODUCT_PAGE_KEY = PAGE_KEY;

export const ALL_PRODUCT_FILTER_KEYS = Object.values(PRODUCT_FILTER_KEYS);

const PRODUCT_SEARCH_PARAM_KEYS = [
  'limit',
  'page',
  'categoryId',
  'subCategoryId',
  'occasionId',
  'minPrice',
  'maxPrice',
  'minRating',
  'maxRating',
  'sortBy',
  'sortOrder',
] as const satisfies readonly (keyof IProductSearchParams)[];

/** Partial ranges are allowed; only rejects when both values are set and max < min. */
export function isValidPriceRange(min: string, max: string): boolean {
  const trimmedMin = min.trim();
  const trimmedMax = max.trim();
  if (!trimmedMin || !trimmedMax) return true;

  const minNum = Number(trimmedMin);
  const maxNum = Number(trimmedMax);
  if (Number.isNaN(minNum) || Number.isNaN(maxNum)) return true;

  return maxNum >= minNum;
}

/** Sorts items by title. */
export function sortByTitle<T extends { title: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.title.localeCompare(b.title));
}

/** Maps URL search params to product API search params. */
export function toProductSearchParams(
  searchParams: ISearchParams | undefined,
): Partial<IProductSearchParams> {
  const params: Partial<IProductSearchParams> = {};

  for (const key of PRODUCT_SEARCH_PARAM_KEYS) {
    const value = getSearchParam(searchParams, key);
    if (value) params[key] = value as IProductSearchParams[typeof key];
  }

  // Landing "view more" uses `occasion`; products filters use `occasionId`.
  if (!params.occasionId) {
    const occasion = getSearchParam(searchParams, 'occasion');
    if (occasion) params.occasionId = occasion;
  }

  return params;
}
