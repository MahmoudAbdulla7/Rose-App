'use client';

import type { Locale } from 'next-intl';
import { useLocale } from 'next-intl';

import { getPathname } from '@/i18n/navigation';

export function getRoseViewHref(mode: 'storefront' | 'admin', locale: Locale) {
  return getPathname({
    href: {
      pathname: '/',
      query: { view: mode === 'storefront' ? 'storefront' : 'admin' },
    },
    locale,
  });
}

/**
 * Switch between admin dashboard and storefront preview.
 * Uses `?view=` so proxy.ts sets/clears the rose_view cookie and redirects.
 * Must be a full document load: dashboard and storefront share `/`, and RoleSlot
 * lives in the root layout, so a client transition reuses the current slot.
 */
export function useRoseViewSwitch() {
  const locale = useLocale();

  return (mode: 'storefront' | 'admin') => {
    window.location.assign(getRoseViewHref(mode, locale));
  };
}
