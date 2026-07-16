import type { ReactNode } from 'react';

export interface ISectionHeadingProps {
  tagline?: string;
  title: ReactNode;
  id?: string;
  className?: string;
}

// Shared `t.rich` renderer for the underlined part of a heading.
export const headingHighlight = (chunks: ReactNode) => (
  <span className="md:decoration-ds-secondary md:underline md:decoration-2 md:underline-offset-8">
    {chunks}
  </span>
);

export default function SectionHeading({ tagline, title, id, className }: ISectionHeadingProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 text-center${className ? ` ${className}` : ''}`}
    >
      {/* Tagline */}
      {tagline && (
        <span className="text-ds-secondary text-sm font-bold tracking-[0.25em] uppercase sm:text-base">
          {tagline}
        </span>
      )}

      {/* Heading Title */}
      <h2
        id={id}
        className="text-ds-primary-saturated relative inline-block text-3xl leading-none font-bold sm:text-4xl"
      >
        <span
          aria-hidden="true"
          className="bg-ds-secondary-faint absolute inset-x-0 bottom-0 -z-10 h-[45%] rounded-e-[20px] max-md:hidden"
        />
        {title}
      </h2>
    </div>
  );
}
