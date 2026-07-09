/** Strips the locale segment from a rewritten or original URL to get the bare pathname. */
export function resolveLocalizedPathname(
  response: Response,
  requestUrl: string,
): {
  locale: string;
  pathname: string;
} {
  const rewrittenUrl = response.headers.get('x-middleware-rewrite') ?? requestUrl;
  const [, locale, ...rest] = new URL(rewrittenUrl).pathname.split('/');
  return { locale, pathname: '/' + (rest.join('/') || '') };
}
