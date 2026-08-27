'use client';

import OrderSummary from '@/features/cart/components/order-summary';
import Stepper from '@/features/layout/components/addresses/stepper';
import { useAddresses } from '@/features/layout/hooks/use-addresses';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Step1Content from './step-1-content';
import Step1Empty from './step-1-empty';
import Step1Skeleton from './step-1-skeleton';
import Step2Content from './step-2-content';
import { Address } from '@/features/layout/lib/types/address';

export default function CheckoutStep1() {
  const { data: addresses, isLoading, isError } = useAddresses();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [couponCode, setCouponCode] = useState<string | null>(null);

  const t = useTranslations('checkout');

  // Set default address once data is loaded
  if (!isLoading && !isError && addresses && addresses.length > 0 && selectedAddressId === null) {
    // 1. Primary address first
    const primary = addresses.find((addr: Address) => addr.isPrimary);
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
  if (step === 2) {
    leftContent = (
      <Step2Content selectedAddressId={selectedAddressId} couponCode={couponCode} />
    );
  } else if (isError) {
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
        setStep={setStep}
      />
    );
  }

  return (
    <section className="my-8">
      <div className="container grid grid-cols-[1fr_30%] gap-10">
        <div className="space-y-6">
          <Stepper step={step} />
          {step === 1 ? (
            <h2 className="text-3xl font-semibold">{t('step1Title')}</h2>
          ) : (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex cursor-pointer items-center gap-1 rounded-2xl bg-zinc-100 px-2.5 py-2.5 text-sm font-semibold text-zinc-800"
              >
                <ArrowLeft className="size-5 rtl:rotate-180" />
                {t('back')}
              </button>
              <h2 className="text-3xl font-semibold">{t('step2Title')}</h2>
            </div>
          )}
          {leftContent}
        </div>
        <div>
          <OrderSummary onCouponApplied={setCouponCode}>
            <></>
          </OrderSummary>
        </div>
      </div>
    </section>
  );
}
