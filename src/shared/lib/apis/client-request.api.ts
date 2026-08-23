/**
 * Client-side fetch helper for Next.js BFF routes (/api/*).
 * Sends cookies via credentials: 'include' so auth stays on the server.
 */
export async function clientRequest<T>(
  endpoint: string,
  init?: RequestInit,
  fallbackMessage = 'Request failed',
): Promise<T> {
  const response = await fetch(endpoint, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  const data = (await response.json()) as T & { message?: string };

  if (!response.ok) {
    throw new Error(
      typeof data === 'object' && data !== null && 'message' in data && data.message
        ? String(data.message)
        : fallbackMessage,
    );
  }

  return data;
}
