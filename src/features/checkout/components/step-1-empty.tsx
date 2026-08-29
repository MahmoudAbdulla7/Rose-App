'use client';

import { AddressesModal } from '@/features/layout/components/addresses/addresses-modal';
import { PlusCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type Step1EmptyProps = {
  onAddAddress: () => void;
};

export default function Step1Empty({ onAddAddress }: Step1EmptyProps) {
  const t = useTranslations('checkout');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    onAddAddress(); // optionally sync parent state
  };

  return (
    <div className="border-ds-border-soft bg-ds-subtle mt-3 flex h-48 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 text-center text-sm lg:mt-4 lg:h-64 lg:gap-4 lg:rounded-3xl lg:text-base">
      <div className="bg-ds-primary/10 flex size-12 items-center justify-center rounded-full lg:size-16">
        <PlusCircle className="text-ds-primary size-6 lg:size-8" />
      </div>
      <button
        type="button"
        onClick={handleOpen}
        className="text-ds-primary cursor-pointer font-medium hover:underline"
      >
        {t('noAddresses')}
      </button>
      <AddressesModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
