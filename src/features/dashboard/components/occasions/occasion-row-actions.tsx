'use client';

import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { useDeleteOccasion } from '@/features/dashboard/lib/hooks/use-delete-occasion.hook';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';

type Props = {
  occasionId: string;
  occasionTitle: string;
};

export default function OccasionRowActions({ occasionId, occasionTitle }: Props) {
  // Translation
  const t = useTranslations('dashboard.occasions.table');

  // State
  const [open, setOpen] = useState(false);

  // Mutation
  const { deleteOccasion, isDeleting } = useDeleteOccasion(occasionId);

  return (
    <div className="flex items-center gap-2.5">
      <Link
        href={`/occasions/${occasionId}/edit`}
        className="bg-ds-info-fade text-ds-info flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        <Pencil className="size-3.5" />
        {t('edit')}
      </Link>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-ds-danger-fade text-ds-danger flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
      >
        <Trash2 className="size-4" />
        {t('delete')}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          overlayClassName="bg-black/70 supports-backdrop-filter:backdrop-blur-none"
          className="bg-ds-plain text-ds-text-plain border-ds-border-subtle w-[calc(100%-2rem)] max-w-120 gap-0 rounded-lg p-6 ring-0 sm:p-10"
        >
          <DialogHeader className="items-center gap-0">
            <div
              aria-hidden="true"
              className="bg-ds-danger-fade mb-5 flex size-20 items-center justify-center rounded-full"
            >
              <div className="bg-ds-danger-faint flex size-13 items-center justify-center rounded-full">
                <Trash2 className="text-ds-danger size-5" strokeWidth={1.8} />
              </div>
            </div>
            <DialogTitle className="text-ds-text-plain text-center text-base leading-5 font-semibold">
              {t('deleteConfirm.title', { name: occasionTitle })}
            </DialogTitle>
            <DialogDescription className="text-ds-text-muted mt-2 text-center text-sm">
              {t('deleteConfirm.description')}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-9 grid grid-cols-2 gap-2 bg-transparent p-0 sm:grid-cols-2 sm:flex-row">
            <DialogClose render={<Button variant="subtle" className="h-11! rounded-md" />}>
              {t('deleteConfirm.cancel')}
            </DialogClose>
            <Button
              className="h-11! rounded-md"
              type="button"
              variant="destructive"
              loading={isDeleting}
              onClick={() => deleteOccasion(undefined, { onSuccess: () => setOpen(false) })}
            >
              {t('deleteConfirm.confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
