import LoginForm from '@/features/auth/components/login-form';
import AuthFormSkeleton from '@/features/auth/skeletons/auth-form.skeleton';
import AuthHeadline from '@/shared/components/auth-headline';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const authT = await getTranslations({ locale, namespace: 'auth' });
  const commonT = await getTranslations({ locale, namespace: 'common' });

  return {
    title: `${authT('login.pageTitle')} | ${commonT('app.title')}`,
  };
}

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthFormSkeleton />}>
      <LoginContent />
    </Suspense>
  );
}

async function LoginContent() {
  const t = await getTranslations('auth');

  return (
    <>
      <AuthHeadline text={t('welcome')} />
      <LoginForm />
    </>
  );
}
