'use client';

import { BrushCleaning } from 'lucide-react';
import { useTranslations } from 'next-intl';

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

type ClearWishlistDialogProps = {
  open: boolean;
  pending?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export default function ClearWishlistDialog({
  open,
  pending = false,
  onOpenChange,
  onConfirm,
}: ClearWishlistDialogProps) {
  const t = useTranslations('common.wishlist.clearConfirmation');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName="bg-black/80 supports-backdrop-filter:backdrop-blur-none"
        className="w-[calc(100%-2rem)] max-w-[22.9375rem] gap-0 rounded-xl bg-white px-4 pt-14 pb-4 text-zinc-800 ring-0 sm:max-w-[22.9375rem] sm:px-4 sm:pt-14 sm:pb-4 dark:bg-white dark:text-zinc-800"
      >
        <DialogHeader className="items-center gap-0">
          <div
            aria-hidden="true"
            className="mb-5 flex size-20 items-center justify-center rounded-full bg-zinc-100"
          >
            <div className="flex size-13 items-center justify-center rounded-full bg-zinc-200">
              <BrushCleaning className="size-5 text-zinc-800" strokeWidth={1.8} />
            </div>
          </div>
          <DialogTitle className="text-center text-base leading-5 font-semibold text-zinc-800">
            {t('title')}
          </DialogTitle>
          <DialogDescription className="sr-only">{t('description')}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-9 grid grid-cols-2 gap-2 bg-transparent p-0 sm:grid-cols-2 sm:flex-row">
          <DialogClose render={<Button variant="subtle" className="h-[2.1875rem] rounded-md" />}>
            {t('cancel')}
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            loading={pending}
            onClick={onConfirm}
            className="h-[2.1875rem] rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
