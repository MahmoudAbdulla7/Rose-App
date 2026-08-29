'use client';

import OrderSummary from '@/features/cart/components/order-summary';
import Stepper from '@/features/layout/components/addresses/stepper';
import { useAddresses } from '@/features/layout/hooks/use-addresses';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Step1Content from './step-1-content';
import Step1Empty from './step-1-empty';
import Step1Skeleton from './step-1-skeleton';

export default function CheckoutStep1() {
  const { data: addresses, isLoading, isError } = useAddresses();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const t = useTranslations('checkout');

  // Set default address once data is loaded
  if (!isLoading && !isError && addresses && addresses.length > 0 && selectedAddressId === null) {
    // 1. Primary address first
    const primary = addresses.find((addr) => addr.isPrimary);
    if (primary) {
      setSelectedAddressId(primary.id);
    }
    // 2. If exactly one address (and no primary), select it
    else if (addresses.length === 1) {
      setSelectedAddressId(addresses[0].id);
    }
    // 3. Otherwise, user must manually select
  }

  // Determine what to render in the left column
  let leftContent;
  if (isError) {
    leftContent = <p className="text-red-600">Failed to load shipping addresses.</p>;
  } else if (isLoading) {
    leftContent = <Step1Skeleton />;
  } else if (!addresses || addresses.length === 0) {
    leftContent = <Step1Empty onAddAddress={() => setOpen(true)} />;
  } else {
    leftContent = (
      <Step1Content
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        setSelectedAddressId={setSelectedAddressId}
        open={open}
        setOpen={setOpen}
        step={step}
        setStep={setStep}
      />
    );
  }

  return (
    <section className="my-5 lg:my-8">
      <div className="container grid grid-cols-1 gap-7 lg:grid-cols-[1fr_30%] lg:gap-10">
        <div className="space-y-2.5">
          <Stepper step={step} />
          <h2 className="text-xl font-semibold sm:text-2xl lg:text-3xl">{t('step1Title')}</h2>
          {leftContent}
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </section>
  );
}
