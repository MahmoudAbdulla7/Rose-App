'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from 'shared/lib/utils';
import { useLocale } from 'next-intl';

export default function LanguageSwitcherComponent() {
  const currentLocale = useLocale();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label="Switch language"
      className="border-border bg-background/80 inline-flex rounded-full border p-1 shadow-sm backdrop-blur-sm"
    >
      {routing.locales.map((nextLocale) => {
        const isActive = currentLocale === nextLocale;

        return (
          <Link
            key={nextLocale}
            href={pathname}
            locale={nextLocale}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-medium transition-all',
              isActive
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            {nextLocale}
          </Link>
        );
      })}
    </div>
  );
}
