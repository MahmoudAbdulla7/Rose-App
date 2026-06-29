/** Ensures callbackUrl is a same-origin relative path to prevent open-redirect attacks. */
export function safeCallbackUrl(raw: string | null, origin: string): string {
  if (!raw) return '/';
  try {
    const url = new URL(raw, origin);
    return url.origin === origin ? url.pathname + url.search : '/';
  } catch {
    return '/';
  }
}
