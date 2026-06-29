'use client';
import { NextIntlClientProvider } from 'next-intl';

import ReactQueryProvider from './react-query.provider';
import ThemeProvider from './theme.provider';

import type { AbstractIntlMessages } from 'next-intl';
import { Toaster } from '../ui/sonner';
import type { NextIntlConfigProps } from '../lib/types/global';

type AppProviderProps = {
  children: React.ReactNode;
  nextIntelConfig: NextIntlConfigProps;
  messages: AbstractIntlMessages;
};

export default function AppProvider({ children, nextIntelConfig, messages }: AppProviderProps) {
  return (
    <NextIntlClientProvider {...nextIntelConfig} messages={messages}>
      <ThemeProvider>
        <ReactQueryProvider>
          {children}
          <Toaster duration={3000} closeButton />
        </ReactQueryProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
