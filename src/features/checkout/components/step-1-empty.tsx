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
    <div className="border-ds-border-soft bg-ds-subtle mt-4 flex h-64 flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed">
      <div className="bg-ds-primary/10 flex size-16 items-center justify-center rounded-full">
        <PlusCircle className="text-ds-primary size-8" />
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
