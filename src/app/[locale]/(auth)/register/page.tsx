import Register from '@/features/auth/components/register';
import AuthHeadline from '@/shared/components/auth-headline';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const authT = await getTranslations({ locale, namespace: 'auth' });
  const commonT = await getTranslations({ locale, namespace: 'common' });

  return {
    title: `${authT('register.pageTitle')} | ${commonT('app.title')}`,
  };
}

export default async function RegisterPage() {
  const t = await getTranslations('auth');

  return (
    <>
      <AuthHeadline text={t('greeting')} />
      <Register />
    </>
  );
}
