import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import DashboardBottomNav from '@/features/dashboard/components/dashboard-bottom-nav';
import DashboardHeader from '@/features/dashboard/components/dashboard-header';
import DashboardSidebar from '@/features/dashboard/components/dashboard-sidebar';

type Props = LayoutProps<'/[locale]'>;

export default async function DashboardLayout({ children, params }: Props): Promise<ReactNode> {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <div className="bg-ds-subtle flex flex-1">
      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 pb-24 lg:pb-6">{children}</main>
      </div>

      <DashboardBottomNav />
    </div>
  );
}
