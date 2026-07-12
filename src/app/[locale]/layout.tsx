import { Inter, Sarabun, Tajawal } from 'next/font/google';
import type { Locale } from 'next-intl';
import { hasLocale } from 'next-intl';
import { getMessages, getTimeZone, getTranslations, setRequestLocale } from 'next-intl/server';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { routing } from '@/i18n/routing';
import { getFormats } from '@/i18n/formats';
import AppProvider from '@/shared/providers/app.provider';
import { notFound } from 'next/navigation';
import type { NextIntlConfigProps } from '@/shared/lib/types/global';

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

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
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

  const messages = await getMessages({ locale });
  const timeZone = await getTimeZone({ locale: locale as Locale });
  const nextIntlConfig: NextIntlConfigProps = {
    timeZone,
    locale: locale as Locale,
    messages,
    formats: getFormats(locale as Locale),
  };

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
      className={`${locale === 'ar' ? tajawal.variable : sarabun.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <AppProvider nextIntlConfig={nextIntlConfig}>{children}</AppProvider>
      </body>
    </html>
  );
}
