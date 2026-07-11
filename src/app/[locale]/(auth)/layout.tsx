import Header from '@/features/landing-page/components/header';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Headline from './_components/auth-headline';
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
        <div className="w-full max-w-3/5 place-self-center">
          {/* Switch Language */}
          <Header />

          {/* Top Separator */}
          <Separator />

          {/* Headline */}
          <Headline />

          {children}

          {/* Bottom Separator */}
          <Separator className="rotate-180" />
        </div>

        {/* Side Image */}
        <div className="relative h-full w-full max-md:hidden">
          <Image src="/assets/images/image.png" alt="" fill sizes="50vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
