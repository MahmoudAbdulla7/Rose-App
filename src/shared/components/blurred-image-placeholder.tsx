import { cn } from '@/shared/lib/utils';

type BlurredImagePlaceholderProps = {
  className?: string;
};

export default function BlurredImagePlaceholder({ className }: BlurredImagePlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'from-soft-pink-100/90 to-maroon-100/80 dark:from-maroon-950 dark:to-maroon-900 absolute inset-0 bg-linear-to-br via-white',
        className,
      )}
    >
      <div className="bg-soft-pink-200/60 dark:bg-maroon-800/40 absolute inset-s-1/3 top-1/4 size-1/2 rounded-full blur-3xl" />
      <div className="bg-maroon-200/50 dark:bg-soft-pink-900/20 absolute inset-e-1/4 bottom-1/4 size-2/5 rounded-full blur-2xl" />
    </div>
  );
}
