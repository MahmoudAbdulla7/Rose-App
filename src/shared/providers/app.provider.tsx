'use client';
import { NextIntlClientProvider } from 'next-intl';

import ReactQueryProvider from './react-query.provider';

import type { AbstractIntlMessages, Locale } from 'next-intl';

type AppProviderProps = {
  children: React.ReactNode;
  locale: Locale;
  messages: AbstractIntlMessages;
};

export default function AppProvider({ children, locale, messages }: AppProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
