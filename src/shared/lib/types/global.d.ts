import type { routing } from '@/i18n/routing';
import type { AbstractIntlMessages, Formats, Locale } from 'next-intl';
import type { SORT_ORDER } from '../apis/api.options';

export type TSortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
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
