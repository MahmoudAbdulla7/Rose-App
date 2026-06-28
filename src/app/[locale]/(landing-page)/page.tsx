import Header from '@/features/landing-page/components/header';
import ThemeToggle from '@/shared/components/theme-toggle';
import { getTranslations } from 'next-intl/server';

export default async function LandingPage() {
  const t = await getTranslations('common');
  return (
    <>
      <Header />
      <h1 className="bg-ds-plain text-ds-text-plain ring-ds-ring-danger mx-10 my-10 rounded-lg ring">
        {t('landing-page.title')}
      </h1>
      <ThemeToggle />
    </>
  );
}
