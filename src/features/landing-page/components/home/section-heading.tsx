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
        'text-maroon-700 dark:text-soft-pink-200 relative isolate shrink-0 text-4xl leading-none font-bold',
        "before:bg-soft-pink-100 before:absolute before:start-0 before:top-6 before:-z-10 before:h-4 before:w-38.5 before:rounded-e-full before:content-[''] dark:before:bg-zinc-700",
        "after:bg-soft-pink-600 dark:after:bg-soft-pink-500 after:absolute after:start-0 after:top-10 after:-z-10 after:h-0.5 after:w-15 after:content-['']",
        className,
      )}
    >
      {props?.children}
    </h2>
  );
}
