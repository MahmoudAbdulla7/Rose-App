'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Separator } from '@/shared/ui/separator';
import { useAddresses } from '../../hooks/use-addresses';
import type { Address } from '../../lib/types/address';
import AddressesModalContent from './addresses-modal-content';

interface AddressBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddressesModal({ open, onOpenChange }: AddressBookModalProps) {
  // Translation
  const t = useTranslations('address');

  // State
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

  // Custom hooks
  const { data: addresses = [], isLoading, isError } = useAddresses();

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (addressToDelete) return;

        onOpenChange(nextOpen);
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-147.75 overflow-visible p-6 md:min-w-3xl"
      >
        <DialogHeader>
          <div className="flex justify-between">
            <DialogTitle className="text-ds-text-plain text-3xl font-bold">
              {t('title')}
            </DialogTitle>
            <Button variant="secondary" size="xl">
              {t('actions.addFirst')}
            </Button>
          </div>
          <Separator className="mt-2" />
        </DialogHeader>

        <div className="overflow-y-auto pe-6">
          <AddressesModalContent
            addresses={addresses}
            isLoading={isLoading}
            isError={isError}
            addressToDelete={addressToDelete}
            setAddressToDelete={setAddressToDelete}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
