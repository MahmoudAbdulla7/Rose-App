'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { useAddresses } from '../../hooks/use-addresses';
import type { Address } from '../../lib/types/address';
import AddressForm from './address-form';
import AddressesModalContent from './addresses-modal-content';

interface AddressBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddressesModal({ open, onOpenChange }: AddressBookModalProps) {
  // Translation
  const t = useTranslations('address');

  // State
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
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
            {/* Title */}
            <DialogTitle className="text-ds-text-plain text-3xl font-bold">
              {view === 'list'
                ? t('title')
                : editingAddress
                  ? t('actions.edit')
                  : t('actions.addFirst')}
            </DialogTitle>

            {/* Add */}
            {view === 'list' && (
              <Button
                variant="secondary"
                size="xl"
                onClick={() => {
                  setEditingAddress(null);
                  setView('add');
                }}
              >
                {t('actions.addFirst')}
              </Button>
            )}
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="overflow-y-auto pe-6">
          {view === 'list' ? (
            <AddressesModalContent
              addresses={addresses}
              isLoading={isLoading}
              isError={isError}
              addressToDelete={addressToDelete}
              setAddressToDelete={setAddressToDelete}
              onEdit={(address) => {
                setEditingAddress(address);
                setView('edit');
              }}
            />
          ) : (
            <AddressForm address={editingAddress} onBack={() => setView('list')} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
