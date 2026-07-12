import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ResetPassword from '@/features/auth/components/reset-password';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth.forgotPassword');

  return {
    title: t('reset.title'),
  };
}

export default function ResetPasswordPage() {
  return <ResetPassword />;
}
