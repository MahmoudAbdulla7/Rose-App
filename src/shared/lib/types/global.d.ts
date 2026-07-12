import type { routing } from '@/i18n/routing';
import type { AbstractIntlMessages, Formats, Locale } from 'next-intl';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
  }
}

export type NextIntlConfigProps = {
  timeZone: string;
  locale: Locale;
  messages: AbstractIntlMessages;
  formats?: Formats;
};
