'use client';
import { NextIntlClientProvider } from 'next-intl';

import ReactQueryProvider from './react-query.provider';
import ThemeProvider from './theme.provider';

import type { AbstractIntlMessages, Locale } from 'next-intl';
import { Toaster } from '../ui/sonner';

type AppProviderProps = {
  children: React.ReactNode;
  locale: Locale;
  messages: AbstractIntlMessages;
};

export default function AppProvider({ children, locale, messages }: AppProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <ReactQueryProvider>
          {children}
          <Toaster duration={3000} closeButton />
        </ReactQueryProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
