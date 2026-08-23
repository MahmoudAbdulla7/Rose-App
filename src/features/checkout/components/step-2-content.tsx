'use client';

import { MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';

import { useStep2Checkout } from '../hooks/use-step-2-checkout';
import PaymentMethodSelector from './payment-method-selector';
import Step2StripeForm from './step-2-stripe-form';

type Step2ContentProps = {
  selectedAddressId: string | null;
  couponCode?: string | null;
};

export default function Step2Content({ selectedAddressId, couponCode }: Step2ContentProps) {
  const t = useTranslations('checkout');
  const { paymentMethod, stripeForm, isLoading, handlePaymentMethodSelect, handleCheckout } =
    useStep2Checkout({ selectedAddressId, couponCode });

  return (
    <div className="flex w-full flex-col items-end gap-3 rounded-xl">
      <PaymentMethodSelector
        paymentMethod={paymentMethod}
        onSelect={handlePaymentMethodSelect}
      />

      <hr className="w-full border-zinc-100" />

      {stripeForm ? (
        <Step2StripeForm
          clientSecret={stripeForm.clientSecret}
          paymentIntentId={stripeForm.paymentIntentId}
        />
      ) : (
        <Button
          className="w-38 rounded-2xl px-4 py-2.5"
          onClick={handleCheckout}
          loading={isLoading}
          disabled={isLoading || !selectedAddressId}
          rightIcon={<MoveRight className="size-5 rtl:rotate-180" />}
        >
          {t('placeOrder')}
        </Button>
      )}
    </div>
  );
}
