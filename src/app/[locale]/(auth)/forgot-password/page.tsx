import ForgotPasswordFlow from '@/features/auth/components/forgot-password-flow';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'auth',
  });

  return {
    title: t('forgotPw.email.title'),
  };
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordFlow />;
}
