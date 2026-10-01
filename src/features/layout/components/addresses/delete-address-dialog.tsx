'use client';

import { toast } from 'sonner';
import { Trash, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import { useDeleteAddress } from '../../hooks/use-delete-address';
import type { Address } from '../../lib/types/address';

interface DeleteAddressDialogProps {
  address: Address;
  onClose: () => void;
}

export default function DeleteAddressDialog({ address, onClose }: DeleteAddressDialogProps) {
  // Translation
  const t = useTranslations('address');

  // Custom hooks
  const { mutate: deleteAddress, isPending } = useDeleteAddress();

  // Functions
  const handleDelete = () => {
    deleteAddress(address.id, {
      onSuccess: () => {
        toast.success(t('messages.deleted'));
        onClose();
      },
    });
  };

  return (
    <>
      {/* Dim overlay */}
      <div className="absolute inset-0 z-40 rounded-xl bg-black/25" />

      {/* Confirmation */}
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background relative w-full max-w-sm rounded-xl p-6">
          {/* Close */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute inset-e-3 top-3"
            onClick={onClose}
            disabled={isPending}
          >
            <X />
          </Button>

          <div className="flex flex-col items-center text-center">
            {/* Figure */}
            <div className="bg-ds-muted mb-6 flex h-24 w-24 items-center justify-center rounded-full">
              <div className="bg-ds-soft flex h-16 w-16 items-center justify-center rounded-full">
                <Trash />
              </div>
            </div>

            {/* Confirmation message */}
            <h2 className="text-lg font-semibold">{t('messages.confirmDelete')}</h2>

            <div className="mt-8 flex w-full gap-3">
              {/* Cancel */}
              <Button variant="subtle" className="flex-1" disabled={isPending} onClick={onClose}>
                {t('actions.cancel')}
              </Button>

              {/* Delete */}
              <Button
                variant="destructive"
                className="flex-1"
                disabled={isPending}
                onClick={handleDelete}
              >
                {isPending ? t('actions.deleting') : t('actions.delete')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
