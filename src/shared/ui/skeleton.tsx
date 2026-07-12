import type { HTMLProps } from 'react';
import { cn } from '../lib/utils';

type SkeletonProps = {
  className?: string;
  props?: HTMLProps<HTMLDivElement>;
};

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800', className)}
      {...props}
    />
  );
}
