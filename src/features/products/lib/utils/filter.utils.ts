import type { IProductSearchParams } from '@/shared/lib/types/product';

export const PRODUCT_FILTER_KEYS = {
  CATEGORY: 'categoryId',
  OCCASION: 'occasionId',
  MIN_RATING: 'minRating',
  MIN_PRICE: 'minPrice',
  MAX_PRICE: 'maxPrice',
} as const;

export const PRODUCT_PAGE_KEY = 'page';

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

/** Gets a search param value. */
export function getSearchParam(
  searchParams: ISearchParams | undefined,
  key: string,
): string | undefined {
  if (!searchParams) return undefined;
  const value = searchParams[key];
  if (value == null) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

/** Appends search params to the URLSearchParams object. */
function appendSearchParams(
  params: URLSearchParams,
  searchParams: ISearchParams | undefined,
  excludeKeys: string[] = [],
) {
  if (!searchParams) return;
  for (const [key, value] of Object.entries(searchParams)) {
    if (excludeKeys.includes(key) || value == null) continue;
    for (const item of [value].flat()) params.append(key, item);
  }
}

/** Sets `key=value`, or removes `key` when it is already set to `value` (toggle). */
export function buildFilterHref(
  searchParams: ISearchParams | undefined,
  key: string,
  value: string,
): string {
  const params = new URLSearchParams();
  const current = getSearchParam(searchParams, key);
  // Changing a filter should restart at page 1.
  const excludeKeys = key === PRODUCT_PAGE_KEY ? [key] : [key, PRODUCT_PAGE_KEY];

  appendSearchParams(params, searchParams, excludeKeys);

  if (current !== value) {
    params.set(key, value);
  }

  const query = params.toString();
  return query ? `?${query}` : '?';
}

/** Sets `key=value`, or removes `key` when value is empty. */
export function setFilterHref(
  searchParams: ISearchParams | undefined,
  key: string,
  value: string,
): string {
  return setFiltersHref(searchParams, { [key]: value });
}

/** Sets multiple filter keys in one href; empty values remove their keys. */
export function setFiltersHref(
  searchParams: ISearchParams | undefined,
  updates: Record<string, string>,
): string {
  const keys = Object.keys(updates);
  const params = new URLSearchParams();
  // Changing filters (not page) should restart at page 1.
  const excludeKeys = keys.includes(PRODUCT_PAGE_KEY) ? keys : [...keys, PRODUCT_PAGE_KEY];

  appendSearchParams(params, searchParams, excludeKeys);

  for (const [key, value] of Object.entries(updates)) {
    const trimmed = value.trim();
    if (trimmed) params.set(key, trimmed);
  }

  const query = params.toString();
  return query ? `?${query}` : '?';
}

/** Clears multiple filter keys in one href; empty values remove their keys. */
export function clearFilterHref(searchParams: ISearchParams | undefined, keys: string[]): string {
  const params = new URLSearchParams();
  const excludeKeys = keys.includes(PRODUCT_PAGE_KEY) ? keys : [...keys, PRODUCT_PAGE_KEY];
  appendSearchParams(params, searchParams, excludeKeys);

  const query = params.toString();
  return query ? `?${query}` : '?';
}

/** Checks if any of the given filter keys are active. */
export function isFilterActive(searchParams: ISearchParams | undefined, keys: string[]): boolean {
  return keys.some((key) => {
    const value = getSearchParam(searchParams, key);
    return value != null && value !== '';
  });
}

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
