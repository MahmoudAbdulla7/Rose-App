import ForgotPasswordFlow from '@/features/auth/components/forgot-password-flow';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = LayoutProps<'/[locale]'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale: locale as 'en' | 'ar', namespace: 'auth' });
  const commonT = await getTranslations({ locale: locale as 'en' | 'ar', namespace: 'common' });

  return {
    title: `${t('forgotPassword.pageTitle')} | ${commonT('app.title')}`,
  };
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordFlow />;
}
