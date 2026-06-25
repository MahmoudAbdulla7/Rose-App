'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/shared/lib/utils';

export default function LanguageSwitcher() {
  // Navigation
  const locale = useLocale();
  const pathname = usePathname();

  //States
  const [query, setQuery] = useState<Record<string, string>>({});

  //Effects
  useEffect(() => {
    setQuery(Object.fromEntries(new URLSearchParams(window.location.search).entries()));
  }, [pathname]);

  return (
    <div
      role="group"
      aria-label="Switch language"
      className="border-border bg-background/80 inline-flex rounded-full border p-1 shadow-sm backdrop-blur-sm"
    >
      {routing.locales.map((nextLocale) => {
        const isActive = locale === nextLocale;

        return (
          <Link
            key={nextLocale}
            href={{
              pathname,
              query,
            }}
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
