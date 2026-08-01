'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';

export type FiltersSheetProps = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  hasActiveFilters?: boolean;
};

/** Sheet trigger + panel for viewports below `lg`. Hidden from `lg` up via CSS. */
export default function FiltersSheet({
  children,
  footer,
  hasActiveFilters = false,
}: FiltersSheetProps) {
  const tFilters = useTranslations('common.filters');

  return (
    <div className="lg:hidden">
      <Dialog>
        <DialogTrigger
          render={
            <Button
              variant="subtle"
              className="relative h-10.25 w-full rounded-xl font-semibold transition-all duration-200 ease-out"
              aria-label={tFilters('open')}
            />
          }
        >
          <SlidersHorizontal className="size-4.5 shrink-0" aria-hidden="true" />
          {tFilters('open')}
          {hasActiveFilters && (
            <span
              className="bg-ds-primary animate-in fade-in-0 zoom-in-50 absolute end-3 top-1/2 size-2 -translate-y-1/2 rounded-full duration-200"
              aria-hidden="true"
            />
          )}
        </DialogTrigger>

        <DialogContent
          showCloseButton
          finalFocus={false}
          className={cn(
            'bg-ds-plain data-open:slide-in-from-start data-closed:slide-out-to-start',
            'data-open:zoom-in-100 data-closed:zoom-out-100',
            'inset-y-0! inset-s-0! inset-e-auto! top-0! flex h-dvh max-h-dvh w-[min(100%,20rem)] max-w-none! flex-col',
            'translate-x-0! translate-y-0! gap-0 overflow-hidden rounded-none p-0 ring-0 duration-300 ease-out',
          )}
        >
          <DialogHeader className="border-ds-border-muted flex flex-row items-center justify-between border-b py-3 ps-4 pe-12">
            <DialogTitle className="text-ds-text-plain text-base font-semibold">
              {tFilters('sidebarLabel')}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-1 flex-col overflow-y-auto px-4 py-2">{children}</div>

          {footer ? (
            <div className="border-ds-border-muted mt-auto border-t px-4 py-4">{footer}</div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
