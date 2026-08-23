import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

export interface ISectionHeadingProps {
  className?: string;
}

export default function SectionHeading({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & ISectionHeadingProps) {
  return (
    <h2
      {...(props as HTMLAttributes<HTMLHeadingElement>)}
      className={cn(
        'text-maroon-700 dark:text-soft-pink-200 relative isolate shrink-0 text-2xl leading-none font-bold sm:text-3xl lg:text-4xl',
        "before:bg-soft-pink-100 before:absolute before:start-0 before:top-4 before:-z-10 before:h-3 before:w-30 before:rounded-e-full before:content-[''] sm:before:top-5 sm:before:h-3 sm:before:w-34 lg:before:top-6 lg:before:h-4 lg:before:w-38.5 dark:before:bg-zinc-700",
        "after:bg-soft-pink-600 dark:after:bg-soft-pink-500 after:absolute after:start-0 after:top-7 after:-z-10 after:h-0.5 after:w-12 after:content-[''] sm:after:top-8 sm:after:w-14 lg:after:top-10 lg:after:w-15",
        className,
      )}
    >
      {props?.children}
    </h2>
  );
}
