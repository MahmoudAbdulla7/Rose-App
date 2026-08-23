import LanguageSwitcherComponent from '@/shared/components/language-switcher';
import Image from 'next/image';
import Separator from './_components/separator';

type Props = LayoutProps<'/[locale]'>;

export default async function AuthLayout({ children }: Props) {
  return (
    <section className="max-h-screen overflow-hidden">
      <div className="grid h-screen grid-cols-1 items-center justify-center md:grid-cols-2">
        <div className="max-h-screen w-full max-w-4/5 lg:max-w-3/5 place-self-center">
          {/* Switch Language */}
          <div className="flex justify-end">
            <LanguageSwitcherComponent />
          </div>

          {/* Top Separator */}
          <Separator />

          {children}

          {/* Bottom Separator */}
          <Separator className="rotate-180" />
        </div>

        {/* Side Image */}
        <div className="relative h-full w-full max-md:hidden">
          <Image src="/assets/images/image.png" alt="" fill sizes="50vw" className="object-fill" />
        </div>
      </div>
    </section>
  );
}
