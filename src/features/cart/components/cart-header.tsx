'use client';

import { useState } from 'react';
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
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';

type CartHeaderProps = {
  itemCount: number;
  onClearCart: () => void;
};

export default function CartHeader({ itemCount, onClearCart }: CartHeaderProps) {
  // Translation
  const t = useTranslations('cart');

  // Dialog state
  const [open, setOpen] = useState(false);

  // Functions
  const handleConfirmClear = () => {
    onClearCart();
    setOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-baseline gap-2">
        <h1 className="text-ds-text-plain text-2xl font-semibold sm:text-3xl">{t('title')}</h1>
        <span className="text-ds-text-soft text-sm">
          {t('productsCount', { count: itemCount })}
        </span>
      </div>

      {itemCount > 0 ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button
                type="button"
                variant="secondary"
                leftIcon={<BrushCleaning className="size-4" />}
              />
            }
          >
            {t('clearCart')}
          </DialogTrigger>

          <DialogContent className="bg-ds-plain sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-ds-text-plain">{t('clearCart')}</DialogTitle>
              <DialogDescription className="text-ds-text-default">
                {t('confirmClear')}
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="bg-transparent">
              <DialogClose render={<Button type="button" variant="subtle" />}>
                {t('cancel')}
              </DialogClose>
              <Button type="button" variant="destructive" onClick={handleConfirmClear}>
                {t('clearCart')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}
