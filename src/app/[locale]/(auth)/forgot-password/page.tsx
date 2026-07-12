import ForgotPasswordFlow from '@/features/auth/components/forgot-password-flow';
import type { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Locale = (typeof routing.locales)[number];

type Props = {
  params: Promise<{
    locale: Locale;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'auth.forgotPassword',
  });

  return {
    title: t('email.title'),
  };
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordFlow />;
}
