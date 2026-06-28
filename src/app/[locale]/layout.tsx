import { Inter, Sarabun, Tajawal } from 'next/font/google';
import { hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { routing } from '@/i18n/routing';
import AppProvider from '@/shared/providers/app.provider';
import { notFound } from 'next/navigation';

//fonts
const sarabun = Sarabun({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-app',
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-app',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

type Props = LayoutProps<'/[locale]'>;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('common');
  return {
    title: t('app.title'),
    description: t('app.description'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props): Promise<ReactNode> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
      className={`${locale === 'ar' ? tajawal.variable : sarabun.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <AppProvider locale={locale} messages={messages}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
