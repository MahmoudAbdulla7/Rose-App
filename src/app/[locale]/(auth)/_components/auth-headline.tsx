'use client';
import { cn } from '@/shared/lib/utils';
import { useTranslations } from 'next-intl';
import localFont from 'next/font/local';
import { usePathname } from 'next/navigation';

const Edwardian = localFont({
  src: '../../../../../public/assets/fonts/Edwardian Script ITC Regular.ttf',
});

export default function Headline() {
  const t = useTranslations();
  const path = usePathname();
  return (
    <div
      className={cn(
        `${path.includes('/en') ? Edwardian.className : ''} ${path.endsWith('/login') || path.endsWith('/register') ? '*:border-b-ds-border-soft *:border-b *:pb-4' : ''} text-ds-primary mx-auto mb-6 w-3/4 text-center text-5xl`,
      )}
    >
      {path.endsWith('/login') && <p>{t('auth.login.meta.welcome')}</p>}
      {path.endsWith('/register') && <p>{t('auth.login.meta.greeting')}</p>}
    </div>
  );
}
