import LoginForm from '@/features/auth/components/login-form';
import AuthHeadline from '@/shared/components/auth-headline';
import { getTranslations } from 'next-intl/server';

export default async function LoginPage() {
  const t = await getTranslations('auth.meta');

  return (
    <>
      <AuthHeadline text={t('welcome')} />
      <LoginForm />
    </>
  );
}
