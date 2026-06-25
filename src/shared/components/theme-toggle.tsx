'use client';

import { Monitor, Moon, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';
import { startTransition, useEffect, useState } from 'react';
import { cn } from '../lib/utils';

const OPTIONS = [
  { value: 'light', label: 'Light', Icon: SunMedium },
  { value: 'system', label: 'System', Icon: Monitor },
  { value: 'dark', label: 'Dark', Icon: Moon },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => startTransition(() => setMounted(true)), []);

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="border-ds-border-soft bg-ds-plain inline-flex w-fit items-center rounded-full border p-0.75"
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const isActive = mounted && theme === value;

        return (
          <button
            key={value}
            type="button"
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
