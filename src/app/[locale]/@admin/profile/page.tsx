import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ locale: string }>;
};

async function ProfileContent({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('dashboard.profile');

  return <h1 className="text-ds-text-plain text-2xl font-semibold">{t('title')}</h1>;
}

export default function DashboardProfilePage(props: Props) {
  return (
    <Suspense fallback={<div className="bg-ds-border-muted h-8 w-48 animate-pulse rounded" />}>
      <ProfileContent {...props} />
    </Suspense>
  );
}
