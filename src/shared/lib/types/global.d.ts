import type { routing } from '@/i18n/routing';
import type { Locale } from 'next-intl';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
  }
}

export type NextIntlConfigProps = {
  timeZone: string;
  locale: Locale;
};
