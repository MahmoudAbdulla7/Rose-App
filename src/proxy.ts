import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import type { Locale } from 'next-intl';

import {
  ROSE_VIEW_COOKIE,
  ROSE_VIEW_MAX_AGE,
} from '@/features/dashboard/lib/constants/rose-view.constant';
import { routing } from './i18n/routing';
import { getPathname } from './i18n/navigation';
import { AUTH_ROUTES } from './shared/lib/constants/auth-routes.constant';
import { PRIVATE_ROUTES } from './shared/lib/constants/private-routes.constant';
import { safeCallbackUrl } from './shared/lib/utils/callback-url.utils';
import { resolveLocalizedPathname } from './shared/lib/utils/localized-pathname.utils';

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const view = request.nextUrl.searchParams.get('view');

  // Set/clear storefront-preview cookie, then redirect to a clean URL without `view`.
  if (view === 'storefront' || view === 'admin') {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete('view');

    const redirectResponse = NextResponse.redirect(cleanUrl);

    if (view === 'storefront') {
      redirectResponse.cookies.set(ROSE_VIEW_COOKIE, 'storefront', {
        path: '/',
        sameSite: 'lax',
        maxAge: ROSE_VIEW_MAX_AGE,
      });
    } else {
      redirectResponse.cookies.delete(ROSE_VIEW_COOKIE);
    }

    return redirectResponse;
  }

  const response = handleI18nRouting(request);
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET! });

  const { locale, pathname } = resolveLocalizedPathname(response, request.url);
  const origin = request.nextUrl.origin;

  const redirectTo = (href: string, query?: Record<string, string>) => {
    const url = new URL(getPathname({ href, locale: locale as Locale }), request.url);
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        url.searchParams.set(key, value);
      }
    }
    return NextResponse.redirect(url);
  };

  if (PRIVATE_ROUTES.has(pathname) && !token) {
    return redirectTo('/login', {
      callbackUrl: safeCallbackUrl(pathname + request.nextUrl.search, origin),
    });
  }

  if (AUTH_ROUTES.has(pathname) && token) {
    return redirectTo(safeCallbackUrl(request.nextUrl.searchParams.get('callbackUrl'), origin));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets).*)'],
};
