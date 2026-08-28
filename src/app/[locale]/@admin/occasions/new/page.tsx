import { useTranslations } from 'next-intl';

import CreateOccasionForm from '@/features/dashboard/components/occasions/create-occasion-form';

export default function DashboardNewOccasionPage() {
  const t = useTranslations('dashboard.occasions');

  return (
    <div className="flex min-h-full flex-col gap-6">
      <h1 className="text-ds-text-plain text-xl font-semibold sm:text-2xl">{t('addTitle')}</h1>

      <CreateOccasionForm submitLabel={t('addSubmit')} />
    </div>
  );
}
