import Header from '@/features/landing-page/components/header';
import { getTranslations } from 'next-intl/server';

export default async function LandingPage() {
  const t = await getTranslations('common');
  return (
    <>
      <Header />
      <h1>{t('landing-page.title')}</h1>
    </>
  );
}
