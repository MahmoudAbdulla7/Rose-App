'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/shared/lib/utils';
import { useLocale, useTranslations } from 'next-intl';

type LanguageSwitcherProps = {
  className?: string;
};

export default function LanguageSwitcherComponent({ className }: LanguageSwitcherProps) {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('auth');

  const otherLocale =
    routing.locales.find((locale) => locale !== currentLocale) || routing.defaultLocale;

  return (
    <Link
      href={pathname}
      locale={otherLocale}
      aria-label={t('langLabel')}
      className={cn('text-ds-text-default hover:text-ds-text-plain text-sm font-medium', className)}
    >
      {t('switchLang')}
    </Link>
  );
}
