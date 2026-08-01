import type { IProductSearchParams } from '@/shared/lib/types/product';

/**
 * Products page URL contract — shared by sidebar filters and the products Grid.
 * Values match `IProductSearchParams` keys so both sides stay API-aligned.
 */
export const PRODUCT_FILTER_KEYS = {
  CATEGORY: 'categoryId',
  OCCASION: 'occasionId',
  MIN_RATING: 'minRating',
  MIN_PRICE: 'minPrice',
  MAX_PRICE: 'maxPrice',
} as const satisfies Record<string, keyof IProductSearchParams>;

export type ProductFilterKey = (typeof PRODUCT_FILTER_KEYS)[keyof typeof PRODUCT_FILTER_KEYS];

export type ProductFilterParams = Pick<IProductSearchParams, ProductFilterKey>;

export const ALL_PRODUCT_FILTER_KEYS = Object.values(PRODUCT_FILTER_KEYS);

/** Grid-owned query keys on the same URL. */
export const PRODUCT_GRID_KEYS = {
  PAGE: 'page',
  LIMIT: 'limit',
  SORT_BY: 'sortBy',
  SORT_ORDER: 'sortOrder',
} as const satisfies Record<string, keyof IProductSearchParams>;

/** Keys stripped whenever a filter write occurs (restart results at page 1). */
const FILTER_WRITE_CLEARS = [PRODUCT_GRID_KEYS.PAGE] as const;

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

/** Picks active sidebar filter params from the URL for Grid / API requests. */
export function pickProductFilterParams(
  searchParams: ISearchParams | undefined,
): Partial<ProductFilterParams> {
  const result: Partial<ProductFilterParams> = {};

  for (const key of ALL_PRODUCT_FILTER_KEYS) {
    const value = getSearchParam(searchParams, key)?.trim();
    if (value) result[key] = value;
  }

  return result;
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

  appendSearchParams(params, searchParams, [key, ...FILTER_WRITE_CLEARS]);

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

  appendSearchParams(params, searchParams, [...keys, ...FILTER_WRITE_CLEARS]);

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
  appendSearchParams(params, searchParams, [...keys, ...FILTER_WRITE_CLEARS]);

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
