/**
 * Convert a URLSearchParams object to an ISearchParams object
 * @param params - The URLSearchParams object to convert
 * @returns The ISearchParams object
 */

export function searchParamsToObject(params: URLSearchParams): ISearchParams {
  const result: ISearchParams = {};

  params.forEach((value, key) => {
    const existing = result[key];
    if (existing == null) {
      result[key] = value;
      return;
    }
    result[key] = Array.isArray(existing) ? [...existing, value] : [existing, value];
  });

  return result;
}
