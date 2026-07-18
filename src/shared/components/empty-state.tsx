import Image from 'next/image';
import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

export interface IEmptyStateProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export default function EmptyState({ title, subtitle, className, children }: IEmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        'relative isolate flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl px-6 py-16 text-center',
        'from-soft-pink-50/80 to-maroon-50/40 bg-linear-to-b via-white',
        'dark:to-maroon-950/40 dark:from-zinc-900 dark:via-zinc-950',
        className,
      )}
    >
      {/* Atmosphere */}
      <div
        aria-hidden="true"
        className="bg-soft-pink-200/50 dark:bg-maroon-800/40 pointer-events-none absolute inset-s-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl rtl:translate-x-1/2"
      />
      <div
        aria-hidden="true"
        className="bg-maroon-100/60 dark:bg-soft-pink-900/20 pointer-events-none absolute inset-e-1/4 -top-8 size-32 rounded-full blur-2xl"
      />
      <div
        aria-hidden="true"
        className="bg-soft-pink-100/80 dark:bg-maroon-900/30 pointer-events-none absolute inset-s-1/5 -bottom-6 size-40 rounded-full blur-2xl"
      />

      {/* Icon */}
      <div className="animate-in fade-in zoom-in-95 relative mb-6 duration-500">
        <div
          aria-hidden="true"
          className="border-soft-pink-200/80 dark:border-maroon-700/60 absolute inset-0 -m-3 rounded-full border border-dashed"
        />
        <div
          className={cn(
            'relative flex size-16 items-center justify-center rounded-full',
            'bg-soft-pink-100 text-maroon-600',
            'dark:bg-maroon-900/80 dark:text-soft-pink-300',
            'shadow-[0_0_0_8px_rgba(255,224,231,0.45)] dark:shadow-[0_0_0_8px_rgba(80,20,25,0.35)]',
          )}
        >
          <Image
            src="/favicon.ico"
            alt=""
            width={32}
            height={32}
            className="size-8 object-contain"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Copy */}
      <div className="animate-in fade-in slide-in-from-bottom-2 relative flex max-w-md flex-col gap-2 delay-100 duration-500">
        <h3 className="text-maroon-700 dark:text-soft-pink-200 text-xl leading-snug font-bold">
          {title}
        </h3>
        {subtitle ? (
          <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        ) : null}
      </div>

      {children ? (
        <div className="animate-in fade-in slide-in-from-bottom-2 relative mt-6 delay-150 duration-500">
          {children}
        </div>
      ) : null}
    </div>
  );
}
