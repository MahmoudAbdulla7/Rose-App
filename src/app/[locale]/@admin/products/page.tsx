import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

export const instant = false;

type Props = {
  params: Promise<{ locale: string }>;
};

async function ProductsContent({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('dashboard.nav');

  return <h1 className="text-ds-text-plain text-2xl font-semibold">{t('products')}</h1>;
}

export default function DashboardProductsPage(props: Props) {
  return (
    <Suspense fallback={<div className="bg-ds-border-muted h-8 w-40 animate-pulse rounded" />}>
      <ProductsContent {...props} />
    </Suspense>
  );
}
