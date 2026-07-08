import { authOptions } from '@/auth';
import NextAuth from 'next-auth';
import type { NextRequest } from 'next/server';

const handler = NextAuth(authOptions);

/**
 * NextAuth v4 does not officially support dynamic per-request cookie options.
 * `session.maxAge` controls JWT validity internally, but the default Set-Cookie
 * header still includes Max-Age — making every login a persistent session cookie
 * regardless of "Remember Me".
 *
 * This POST wrapper intercepts `/callback/credentials` responses and strips
 * Max-Age/Expires from session cookies when the user opts out of remembering.
 *
 * ⚠️ Browser limitation: Chrome and Firefox may restore session cookies after a
 * full browser restart via "restore previous session". That behavior cannot be
 * controlled server-side; this workaround covers default browser behavior only.
 */
function stripPersistentCookieAttributes(cookie: string): string {
  return cookie.replace(/;\s*Max-Age=\d+/gi, '').replace(/;\s*Expires=[^;]+/gi, '');
}

function applySessionCookiePolicy(response: Response, rememberMe: boolean): Response {
  if (rememberMe) {
    return response;
  }

  const newHeaders = new Headers(response.headers);
  const setCookies =
    typeof response.headers.getSetCookie === 'function' ? response.headers.getSetCookie() : [];

  if (setCookies.length > 0) {
    newHeaders.delete('set-cookie');

    for (const cookie of setCookies) {
      newHeaders.append('set-cookie', stripPersistentCookieAttributes(cookie));
    }
  } else {
    const rawCookie = response.headers.get('set-cookie');

    if (rawCookie) {
      newHeaders.set('set-cookie', stripPersistentCookieAttributes(rawCookie));
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

async function POST(req: NextRequest, context: RouteContext<'/api/auth/[...nextauth]'>) {
  const { pathname } = new URL(req.url);
  const isCredentialsCallback = pathname.endsWith('/callback/credentials');

  if (!isCredentialsCallback) {
    return handler(req, context);
  }

  // Clone before reading body so NextAuth can still consume the original request stream.
  const clonedBody = await req.clone().text();
  const rememberMe = new URLSearchParams(clonedBody).get('rememberMe') === 'true';
  const response = await handler(req, context);

  return applySessionCookiePolicy(response, rememberMe);
}

export { handler as GET, POST };
