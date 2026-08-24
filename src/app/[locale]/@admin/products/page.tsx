import { useTranslations } from 'next-intl';


export default function DashboardProductsPage() {
  const t = useTranslations('dashboard.nav');

  return <h1 className="text-ds-text-plain text-2xl font-semibold">{t('products')}</h1>;
}
