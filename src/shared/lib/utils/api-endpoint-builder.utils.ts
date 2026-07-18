/**
 * Builds an API endpoint URL with the given path and search params.
 * @param path - The path of the API endpoint.
 * @param searchParams - The search params of the API endpoint.
 * @returns The API endpoint URL.
 */

export function buildApiEndpoint(
  path: string,
  searchParams?: Record<string, string | string[] | undefined>,
): URL {
  const endpoint = new URL(`${process.env.NEXT_BASE_URL}${path}`);

  if (searchParams) {
    endpoint.search = new URLSearchParams(
      Object.entries(searchParams).map(([key, value]) => [key, value as string]),
    ).toString();
  }

  return endpoint;
}
