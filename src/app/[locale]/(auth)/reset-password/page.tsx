import ResetPassword from '@/features/auth/components/reset-password';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = LayoutProps<'/[locale]'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const authT = await getTranslations({ locale: locale as 'en' | 'ar', namespace: 'auth' });
  const commonT = await getTranslations({ locale: locale as 'en' | 'ar', namespace: 'common' });

  return {
    title: `${authT('forgotPassword.reset.title')} | ${commonT('app.title')}`,
  };
}

export default function ResetPasswordPage() {
  return <ResetPassword />;
}
