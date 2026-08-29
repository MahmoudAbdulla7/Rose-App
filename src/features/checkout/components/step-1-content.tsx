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
      <ul className="mt-3 space-y-2.5 lg:mt-4 lg:space-y-3">
        {addresses.map((address) => {
          const isSelected = selectedAddressId === address.id;
          return (
            <li
              key={address.id}
              className={cn(
                'cursor-pointer rounded-2xl px-3 py-3 text-sm font-medium transition-all sm:px-4 lg:rounded-3xl lg:py-3.5 lg:text-base',
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
                    'flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between lg:items-stretch lg:gap-0',
                    isSelected ? '*:text-ds-text-inverse' : '*:text-ds-text-plain',
                  )}
                >
                  <p className="text-lg font-semibold sm:text-xl lg:text-2xl">{address.city}</p>
                  <p className="flex min-w-0 items-center gap-2 lg:gap-2.5">
                    <span
                      className={cn(
                        'flex size-7 shrink-0 items-center justify-center rounded-full lg:size-9',
                        isSelected ? '*:text-ds-primary bg-zinc-50' : 'bg-ds-primary *:text-white',
                      )}
                    >
                      <Phone className="size-4 lg:size-[22px]" />
                    </span>
                    <span className={cn('truncate', !isSelected ? 'text-ds-text-soft' : '')}>
                      {address.phone}
                    </span>
                  </p>
                </div>
                <p
                  className={cn(
                    'mt-2 w-fit max-w-full truncate rounded-full px-2.5 py-1 text-xs sm:text-sm lg:mt-2.5 lg:px-3 lg:text-base',
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

      <p className="text-ds-text-soft text-center text-sm font-semibold lg:text-lg">OR</p>
      <div className="my-4 text-center text-sm lg:my-6 lg:text-base">
        <button
          className="text-ds-primary cursor-pointer font-medium hover:underline"
          onClick={() => setOpen(true)}
        >
          {t('addAddress')}
        </button>
        <AddressesModal open={open} onOpenChange={setOpen} />
      </div>

      <div className="w-full text-end">
        <Button
          className="self-center px-7 py-2 text-sm lg:px-10 lg:py-2.5"
          onClick={() => setStep(2)}
        >
          {t('next')}
          <MoveRight className="size-3 lg:size-4 rtl:rotate-180" />
        </Button>
      </div>

      <p className="mt-4 text-sm text-zinc-500">Selected address ID: {selectedAddressId}</p>
    </>
  );
}
