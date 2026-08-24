import { useTranslations } from 'next-intl';


export default function DashboardOverviewPage() {
  const t = useTranslations('dashboard.nav');

  return <h1 className="text-ds-text-plain text-2xl font-semibold">{t('overview')}</h1>;
}
