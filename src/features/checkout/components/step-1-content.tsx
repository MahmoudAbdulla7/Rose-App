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
  setStep: (step: number) => void;
};

export default function Step1Content({
  addresses,
  selectedAddressId,
  setSelectedAddressId,
  open,
  setOpen,
  setStep,
}: Step1ContentProps) {
  const t = useTranslations('checkout');

  return (
    <div className="flex w-full flex-col items-end gap-3">
      <ul className="flex w-full flex-col gap-3">
        {addresses.map((address) => {
          const isSelected = selectedAddressId === address.id;

          return (
            <li key={address.id}>
              <input
                type="radio"
                id={address.id}
                name="address"
                value={address.id}
                hidden
                checked={isSelected}
                onChange={() => setSelectedAddressId(address.id)}
              />
              <label
                htmlFor={address.id}
                className={cn(
                  'flex cursor-pointer flex-col gap-1.5 rounded-xl border border-zinc-300 px-4 py-3.5 transition-colors',
                  isSelected
                    ? 'bg-maroon-600'
                    : 'bg-white hover:bg-zinc-50/50 dark:bg-transparent dark:hover:bg-zinc-900/50',
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <p
                    className={cn(
                      'text-2xl leading-none font-semibold',
                      isSelected ? 'text-zinc-50' : 'text-zinc-800 dark:text-zinc-500',
                    )}
                  >
                    {address.city}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        'flex size-8.25 shrink-0 items-center justify-center rounded-full',
                        isSelected
                          ? 'bg-zinc-50 text-maroon-600'
                          : 'bg-maroon-600 text-white',
                      )}
                    >
                      <Phone size={18} />
                    </span>
                    <span
                      className={cn(
                        'text-lg leading-none font-medium',
                        isSelected ? 'text-zinc-50' : 'text-zinc-500',
                      )}
                    >
                      {address.phone}
                    </span>
                  </p>
                </div>
                <p
                  className={cn(
                    'w-fit rounded-full px-3 py-1 text-base leading-none font-medium',
                    isSelected
                      ? 'bg-zinc-800 text-zinc-50'
                      : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-100 dark:text-zinc-800',
                  )}
                >
                  {address.street}
                </p>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="flex w-full flex-col gap-2.5 border-b pb-2.5 border-zinc-100">
        <div className="py-2.25">
          <span className="text-zinc-500 flex w-full items-center gap-2.5 text-lg leading-none font-semibold before:h-px before:flex-1 before:bg-zinc-100 before:content-[''] after:h-px after:flex-1 after:bg-zinc-100 after:content-['']">
            OR
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full cursor-pointer rounded-2xl bg-maroon-50 px-4 py-3.5 text-base leading-none font-medium text-maroon-600 transition-colors hover:bg-maroon-100"
        >
          {t('addAddress')}
        </button>
        <AddressesModal open={open} onOpenChange={setOpen} />
      </div>

      <Button
        className="w-38 rounded-2xl px-4 py-2.5"
        onClick={() => setStep(2)}
        rightIcon={<MoveRight className="size-5 rtl:rotate-180" />}
      >
        {t('next')}
      </Button>
    </div>
  );
}
