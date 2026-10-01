import ResetPassword from '@/features/auth/components/forgot-password/reset-password';
import AuthFormSkeleton from '@/features/auth/skeletons/auth-form.skeleton';
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
    title: `${authT('forgotPassword.reset.title')} | ${commonT('app.title')}`,
  };
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<AuthFormSkeleton />}>
      <ResetPassword />
    </Suspense>
  );
}
