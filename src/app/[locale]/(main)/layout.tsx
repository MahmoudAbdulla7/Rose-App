import Header from '@/features/landing-page/components/header';
import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

type Props = LayoutProps<'/[locale]'>;

export default async function MainLayout({ children, params }: Props): Promise<ReactNode> {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
    </>
  );
}
