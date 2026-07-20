import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '@/shared/ui/button';
import { RotateCcw } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export type ResetAllFiltersProps = {
  href: string;
  hasActiveFilters: boolean;
};

export default async function ResetAllFilters({ href, hasActiveFilters }: ResetAllFiltersProps) {
  const tButton = await getTranslations('common.button');

  return (
    <Link
      href={href}
      aria-disabled={!hasActiveFilters}
      tabIndex={hasActiveFilters ? undefined : -1}
      className={cn(
        buttonVariants({ variant: 'secondary' }),
        'h-10.25 w-full rounded-xl font-semibold',
        !hasActiveFilters && 'pointer-events-none opacity-50',
      )}
    >
      <RotateCcw className="size-4.5 shrink-0" aria-hidden="true" />
      {tButton('resetAll')}
    </Link>
  );
}
