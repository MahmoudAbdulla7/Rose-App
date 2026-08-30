import ForgotPasswordFlow from '@/features/auth/components/forgot-password/forgot-password-flow';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export const instant = false;

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'auth' });
  const commonT = await getTranslations({ locale, namespace: 'common' });

  return {
    title: `${t('forgotPassword.pageTitle')} | ${commonT('app.title')}`,
  };
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordFlow />;
}
