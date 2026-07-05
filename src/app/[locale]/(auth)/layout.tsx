import Header from '@/features/landing-page/components/header';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Headline from './_components/auth-headline';
import Separator from './_components/separator';

export async function generateMetadata(): Promise<Metadata> {
  const commonT = await getTranslations('common');
  const authT = await getTranslations('auth');

  return {
    title: `${authT('pageTitle')} | ${commonT('app.title')}`,
    description: commonT('app.description'),
  };
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
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
