import Header from '@/features/layout/components/header';
import HeaderSkeleton from '@/features/layout/skeletons/header.skeleton';
import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Suspense, type ReactNode } from 'react';

type Props = LayoutProps<'/[locale]'>;

export default function DashboardLayout({ children, params }: Props): ReactNode {
  return (
    <>
      <Suspense fallback={<HeaderSkeleton />}>
        <DashboardHeader params={params} />
      </Suspense>
      <main className="flex-1">{children}</main>
    </>
  );
}

async function DashboardHeader({ params }: Pick<Props, 'params'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <Header />;
}
