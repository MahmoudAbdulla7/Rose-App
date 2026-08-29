'use client';

import { useRouter } from '@/i18n/navigation';

/**
 * Switch between admin dashboard and storefront preview.
 * Uses `?view=` so proxy.ts sets/clears the rose_view cookie and redirects —
 * soft navigation (no full document reload).
 */
export function useRoseViewSwitch() {
  const router = useRouter();

  return (mode: 'storefront' | 'admin') => {
    router.push({
      pathname: '/',
      query: { view: mode === 'storefront' ? 'storefront' : 'admin' },
    });
  };
}
