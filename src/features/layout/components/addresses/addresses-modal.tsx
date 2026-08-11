'use client';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Separator } from '@/shared/ui/separator';
import { useAddresses } from '../../hooks/use-addresses';
import AddressesModalContent from './addresses-modal-content';

interface AddressBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddressesModal({ open, onOpenChange }: AddressBookModalProps) {
  const { data: addresses = [], isLoading, isError } = useAddresses();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-147.75 overflow-y-auto p-6 pe-10 md:min-w-3xl"
      >
        <DialogHeader>
          <div className="flex justify-between">
            <DialogTitle className="text-ds-text-plain text-3xl font-bold">
              My Addresses
            </DialogTitle>
            <Button variant="secondary" size="xl">
              Add a New Address
            </Button>
          </div>
          <Separator className="mt-2" />
        </DialogHeader>

        <AddressesModalContent addresses={addresses} isLoading={isLoading} isError={isError} />
      </DialogContent>
    </Dialog>
  );
}
