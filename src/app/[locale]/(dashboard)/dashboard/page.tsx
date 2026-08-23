import { useTranslations } from 'next-intl';

import type { ReactNode } from 'react';

export default function DashboardOverviewPage(): ReactNode {
  const t = useTranslations('dashboard.nav');

  return <h1 className="text-ds-text-plain text-2xl font-semibold">{t('overview')}</h1>;
}
