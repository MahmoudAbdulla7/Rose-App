import { useTranslations } from 'next-intl';

import CreateCategoryForm from '@/features/dashboard/components/categories/create-category-form';

export default function DashboardNewCategoryPage() {
  const t = useTranslations('dashboard.categories');

  return (
    <div className="flex min-h-full flex-col gap-6">
      <h1 className="text-ds-text-plain text-xl font-semibold sm:text-2xl">{t('addTitle')}</h1>

      <CreateCategoryForm submitLabel={t('addSubmit')} />
    </div>
  );
}
