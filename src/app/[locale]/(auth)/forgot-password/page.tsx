import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import ForgotPasswordFlow from './forgot-password-flow';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth');
  return { title: t('forgotPw.step1.title') };
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordFlow />;
}
