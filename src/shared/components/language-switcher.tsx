'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

export default function LanguageSwitcherComponent() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('auth');

  const otherLocale =
    routing.locales.find((locale) => locale !== currentLocale) || routing.defaultLocale;

  return (
    <header className="w-full text-end">
      <Link href={pathname} locale={otherLocale} aria-label={t('langLabel')}>
        {t('switchLang')}
      </Link>
    </header>
  );
}
