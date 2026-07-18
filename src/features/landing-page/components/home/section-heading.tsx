import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

export interface ISectionHeadingProps {
  tagline?: string;
  title: ReactNode;
  id?: string;
  className?: string;
}

// Shared `t.rich` renderer for the underlined part of a heading.
export const headingHighlight = (chunks: ReactNode) => (
  <span className="md:decoration-ds-secondary md:underline md:decoration-2 md:underline-offset-[0.1em]">
    {chunks}
  </span>
);

export default function SectionHeading({ tagline, title, id, className }: ISectionHeadingProps) {
  return (
    <div className={cn('flex flex-col items-center gap-2 text-center', className)}>
      {/* Tagline */}
      {tagline && (
        <span className="text-ds-secondary text-sm font-bold tracking-[0.25em] uppercase sm:text-base">
          {tagline}
        </span>
      )}

      {/* Heading Title */}
      <h2
        id={id}
        className="text-ds-primary-saturated before:bg-ds-secondary-faint relative inline-block text-3xl leading-none font-bold before:absolute before:bottom-0 before:-z-10 before:h-[45%] before:w-[77%] before:rounded-e-[20px] before:content-[''] max-md:before:hidden sm:text-4xl"
      >
        {title}
      </h2>
    </div>
  );
}
