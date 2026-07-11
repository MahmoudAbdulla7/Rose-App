import Header from '@/features/landing-page/components/header';
import Image from 'next/image';
import SeparatorComponent from './_components/separator';
import HeadlineComponent from './_components/auth-headline';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section>
        <div className="grid h-screen grid-cols-1 items-center justify-center md:grid-cols-2">
          <div className="w-full max-w-10/12 place-self-center">
            <Header />

            {/* Top Separator */}
            <SeparatorComponent />

            {/* Headline */}
            <HeadlineComponent />

            {children}

            {/* Bottom Separator */}
            <SeparatorComponent className="rotate-180" />
          </div>

          {/* Side Image */}
          <div className="relative h-full w-full max-md:hidden">
            <Image
              src="/assets/images/image.png"
              alt="auth-img"
              fill
              sizes="50vw"
              className="text-ds-primary object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
