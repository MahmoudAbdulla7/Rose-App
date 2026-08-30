import { Inter, Sarabun, Tajawal } from 'next/font/google';
import type { Locale } from 'next-intl';
import { hasLocale } from 'next-intl';
import { getMessages, getTimeZone, getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

import { authOptions } from '@/auth';
import { ROLES } from '@/features/auth/lib/constants/roles.constant';
import { ROSE_VIEW_COOKIE } from '@/features/dashboard/lib/constants/rose-view.constant';
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  'use cache';
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'common' });
  return {
    title: t('app.title'),
    description: t('app.description'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Admins see the dashboard slot, everyone else the storefront slot.
// Exception: rose_view=storefront cookie previews the storefront for admins.
// The omitted slot is dropped from the tree, so its pages export `instant = false`.
async function RoleSlot({ admin, user }: { admin: ReactNode; user: ReactNode }): Promise<ReactNode> {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== ROLES.ADMIN) {
    return user;
  }

  const cookieStore = await cookies();
  if (cookieStore.get(ROSE_VIEW_COOKIE)?.value === 'storefront') {
    return user;
  }

  return admin;
}

export default async function RootLayout({ admin, user, params }: Props): Promise<ReactNode> {
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
        <AppProvider nextIntlConfig={nextIntlConfig}>
          <Suspense>
            <RoleSlot admin={admin} user={user} />
          </Suspense>
        </AppProvider>
      </body>
    </html>
  );
}
