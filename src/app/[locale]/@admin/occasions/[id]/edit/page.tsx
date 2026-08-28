import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import UpdateOccasionForm from '@/features/dashboard/components/occasions/update-occasion-form';
import { getOccasionById } from '@/shared/lib/services/occasions.service';

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export default async function DashboardEditOccasionPage({ params }: Props) {
  const { id } = await params;
  const locale = await getLocale();
  const occasion = await getOccasionById(id, { locale });

  if (!occasion) notFound();

  const t = await getTranslations('dashboard.occasions');

  return (
    <div className="flex min-h-full flex-col gap-6">
      <h1 className="text-ds-text-plain text-xl font-semibold sm:text-2xl">
        {t('updateTitle', { name: occasion.title })}
      </h1>

      <UpdateOccasionForm
        submitLabel={t('updateSubmit')}
        occasionId={occasion.id}
        defaultName={occasion.title}
        defaultDescription={occasion.description}
        imageUrl={occasion.image}
      />
    </div>
  );
}
