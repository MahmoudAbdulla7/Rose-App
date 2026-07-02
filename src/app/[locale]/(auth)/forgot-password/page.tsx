import ForgotPasswordFlow from '@/features/auth/components/forgot-password-flow';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth');
  return { title: t('forgotPw.step1.title') };
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordFlow />;
}
