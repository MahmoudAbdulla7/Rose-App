'use client';

import { AddressesModal } from '@/features/layout/components/addresses/addresses-modal';
import type { Address } from '@/features/layout/lib/types/address';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { MoveRight, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Step1ContentProps = {
  addresses: Address[];
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  step: number;
  setStep: (step: number) => void;
};

export default function Step1Content({
  addresses,
  selectedAddressId,
  setSelectedAddressId,
  open,
  setOpen,
  // step,
  setStep,
}: Step1ContentProps) {
  const t = useTranslations('checkout');

  return (
    <>
      <ul className="mt-4 space-y-3">
        {addresses.map((address) => {
          const isSelected = selectedAddressId === address.id;
          return (
            <li
              key={address.id}
              className={cn(
                'cursor-pointer rounded-3xl px-4 py-3.5 font-medium transition-all',
                isSelected
                  ? 'bg-ds-primary border-ds-border-soft'
                  : 'border-zinc-300 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800',
              )}
            >
              <input
                type="radio"
                id={address.id}
                name="address"
                value={address.id}
                hidden
                checked={isSelected}
                onChange={() => setSelectedAddressId(address.id)}
                className="accent-maroon-600 h-4 w-4"
              />
              <label htmlFor={address.id}>
                <div
                  className={cn(
                    'flex justify-between',
                    isSelected ? '*:text-ds-text-inverse' : '*:text-ds-text-plain',
                  )}
                >
                  <p className="text-2xl font-semibold">{address.city}</p>
                  <p className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        'flex size-9 items-center justify-center rounded-full',
                        isSelected ? '*:text-ds-primary bg-zinc-50' : 'bg-ds-primary *:text-white',
                      )}
                    >
                      <Phone size={22} />
                    </span>
                    <span className={!isSelected ? 'text-ds-text-soft' : ''}>{address.phone}</span>
                  </p>
                </div>
                <p
                  className={cn(
                    'mt-2.5 w-fit rounded-full px-3 py-1',
                    isSelected ? 'bg-ds-inverse text-ds-text-inverse' : '',
                  )}
                >
                  {address.street}
                </p>
              </label>
            </li>
          );
        })}
      </ul>

      <p className="text-ds-text-soft text-center text-lg font-semibold">OR</p>
      <div className="my-6 text-center">
        <button
          className="text-ds-primary cursor-pointer font-medium hover:underline"
          onClick={() => setOpen(true)}
        >
          {t('addAddress')}
        </button>
        <AddressesModal open={open} onOpenChange={setOpen} />
      </div>

      <div className="w-full text-end">
        <Button className="self-center px-10 py-2.5" onClick={() => setStep(2)}>
          {t('next')}
          <MoveRight className="rtl:rotate-180" />
        </Button>
      </div>

      <p className="mt-4 text-sm text-zinc-500">Selected address ID: {selectedAddressId}</p>
    </>
  );
}
