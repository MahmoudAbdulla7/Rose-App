import LoginForm from '@/features/auth/components/login-form';
import { Link } from '@/i18n/navigation';
import AuthHeadline from '@/shared/components/auth-headline';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

type Props = LayoutProps<'/[locale]'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const authT = await getTranslations({ locale: locale as Locale, namespace: 'auth' });
  const commonT = await getTranslations({ locale: locale as Locale, namespace: 'common' });

  return {
    title: `${authT('login.pageTitle')} | ${commonT('app.title')}`,
  };
}

export default async function LoginPage() {
  const t = await getTranslations('auth');
  const tLogin = await getTranslations('auth.login');

  return (
    <>
      <AuthHeadline text={t('welcome')} />
      <LoginForm>
        <p className="font-primary text-ds-text-plain text-center text-sm leading-none">
          {tLogin('footer.noAccount')}{' '}
          <Link
            href="/register"
            className="text-ds-primary-saturated hover:text-ds-primary font-bold"
          >
            {tLogin('actions.createAccount')}
          </Link>
        </p>
      </LoginForm>
    </>
  );
}
