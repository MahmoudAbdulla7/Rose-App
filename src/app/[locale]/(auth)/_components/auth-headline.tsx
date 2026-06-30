'use client';
import { useTranslations } from 'next-intl';
import localFont from 'next/font/local';
import { usePathname } from 'next/navigation';

const Edwardian = localFont({
  src: '../../../../../public/assets/fonts/Edwardian Script ITC Regular.ttf',
});

export default function HeadlineComponent() {
  const t = useTranslations();
  const path = usePathname();
  return (
    <div className="border-b-ds-border-soft mx-auto w-3/4 border-b pb-4 text-center">
      {path.endsWith('/login') && (
        <p className={`${Edwardian.className} text-ds-primary text-5xl`}>{t('auth.welcome')}</p>
      )}
      {path.endsWith('/register') && (
        <p className={`${Edwardian.className} text-ds-primary text-5xl`}>{t('auth.greeting')}</p>
      )}
    </div>
  );
}
