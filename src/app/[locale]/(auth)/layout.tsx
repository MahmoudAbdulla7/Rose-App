import Header from '@/features/landing-page/components/header';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Separator from './_components/separator';

type Props = LayoutProps<'/[locale]'>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const commonT = await getTranslations({ locale, namespace: 'common' });
  const authT = await getTranslations({ locale, namespace: 'auth' });

  return {
    title: `${authT('pageTitle')} | ${commonT('app.title')}`,
    description: commonT('app.description'),
  };
}

export default async function AuthLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <section>
      <div className="grid h-screen grid-cols-1 items-center justify-center md:grid-cols-2">
        <div className="w-full max-w-lg place-self-center px-6">
          {/* Switch Language */}
          <Header />

          {/* Top Separator */}
          <Separator />

          <div>{children}</div>

          {/* Bottom Separator */}
          <Separator className="rotate-180" />
        </div>

        {/* Side Image */}
        <div
          className="h-full w-full bg-[url('/assets/images/image.png')] bg-cover bg-center bg-no-repeat max-md:hidden"
          role="img"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
