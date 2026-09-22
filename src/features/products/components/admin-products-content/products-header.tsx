import { Link } from '@/i18n/navigation';
import { Plus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function ProductsHeader() {
  const t = await getTranslations('dashboard.pages.products');
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-semibold">{t('title')}</h3>
      <Link
        href=""
        className="bg-ds-primary text-ds-text-inverse rounded-xl p-2.5 font-medium md:flex md:items-center md:gap-2.5"
      >
        <Plus />
        <span className="max-md:hidden">{t('actions.addProduct')}</span>
      </Link>
    </div>
  );
}
