'use client';

import { Monitor, Moon, SunMedium } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

const OPTIONS = [
  { value: 'light', labelKey: 'light', Icon: SunMedium },
  { value: 'system', labelKey: 'system', Icon: Monitor },
  { value: 'dark', labelKey: 'dark', Icon: Moon },
] as const;

export default function ThemeToggle() {
  // Translation
  const t = useTranslations('common.theme');

  // State
  const [mounted, setMounted] = useState(false);

  // Custom hooks
  const { theme, setTheme } = useTheme();

  // Effects
  useEffect(() => setMounted(true), []);

  return (
    <div
      role="radiogroup"
      aria-label={t('toggle')}
      className="border-ds-border-soft bg-ds-plain inline-flex w-fit items-center rounded-full border p-0.75"
    >
      {OPTIONS.map(({ value, labelKey, Icon }) => {
        const isActive = mounted && theme === value;
        const label = t(labelKey);

        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            onClick={() => setTheme(value)}
            className={cn(
              'flex size-8.5 items-center justify-center rounded-full transition-colors',
              'cursor-pointer focus-visible:ring focus-visible:outline-none',
              isActive ? 'bg-ds-muted text-ds-text-plain' : 'text-ds-text-plain',
            )}
          >
            <Icon className="size-6" />
          </button>
        );
      })}
    </div>
  );
}
