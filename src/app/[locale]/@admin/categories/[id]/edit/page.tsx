import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import UpdateCategoryForm from '@/features/dashboard/components/categories/update-category-form';
import { getCategoryById } from '@/shared/lib/services/categories.service';

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export default async function DashboardEditCategoryPage({ params }: Props) {
  const { id } = await params;
  const locale = await getLocale();
  const category = await getCategoryById(id, { locale });

  if (!category) notFound();

  const t = await getTranslations('dashboard.categories');

  return (
    <div className="flex min-h-full flex-col gap-6">
      <h1 className="text-ds-text-plain text-xl font-semibold sm:text-2xl">
        {t('updateTitle', { name: category.title })}
      </h1>

      <UpdateCategoryForm
        submitLabel={t('updateSubmit')}
        categoryId={category.id}
        defaultName={category.title}
        defaultDescription={category.description}
        imageUrl={category.image}
      />
    </div>
  );
}
