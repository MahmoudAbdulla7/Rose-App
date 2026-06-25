'use client';
import { NextIntlClientProvider } from 'next-intl';

import ReactQueryProvider from './react-query.provider';

import type { AbstractIntlMessages, Locale } from 'next-intl';
import { Toaster } from '../ui/sonner';
import { AlertTriangle, Check, Info, X } from 'lucide-react';

type AppProviderProps = {
  children: React.ReactNode;
  locale: Locale;
  messages: AbstractIntlMessages;
};

export default function AppProvider({ children, locale, messages }: AppProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ReactQueryProvider>
        {children}
        <Toaster
          duration={3000}
          closeButton
          icons={{
            success: <Check size={18} className="text-ds-success" />,
            error: <X size={18} className="text-ds-danger" />,
            info: <Info size={18} />,
            warning: <AlertTriangle size={18} className="text-ds-warning" />,
            close: <X size={15} className="text-ds-text-default" />,
          }}
          toastOptions={{
            classNames: {
              toast: 'text-ds-text-plain! border! dark:border-none!',
              success: 'bg-ds-success-fade!',
              error: 'bg-ds-danger-fade!',
              info: 'bg-ds-muted!',
              warning: 'bg-ds-warning-fade!',
              closeButton:
                'rounded-none! top-2.5! left-full! -translate-x-full! bg-transparent! border-none!',
            },
          }}
        />
      </ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
