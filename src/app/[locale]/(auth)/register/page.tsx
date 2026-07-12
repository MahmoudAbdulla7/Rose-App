import Register from '@/features/auth/components/register';
import AuthHeadline from '@/shared/components/auth-headline';
import { getTranslations } from 'next-intl/server';

export default async function RegisterPage() {
  const t = await getTranslations('auth.login.meta');

  return (
    <>
      <AuthHeadline text={t('greeting')} />
      <Register />
    </>
  );
}
