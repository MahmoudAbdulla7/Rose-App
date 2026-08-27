'use client';

import { MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';

import { useStripeCardPayment } from '../hooks/use-stripe-card-payment';
import StripeCardInput from './stripe-card-input';

type StripeCardFormProps = {
  paymentIntentId: string;
};

export default function StripeCardForm({ paymentIntentId }: StripeCardFormProps) {
  const t = useTranslations('checkout');
  const { stripe, elements, handleSubmit, loading } = useStripeCardPayment({ paymentIntentId });

  return (
    <div className="flex w-full flex-col items-end gap-4">
      <div className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 dark:border-zinc-700 dark:bg-zinc-900">
        <StripeCardInput />
      </div>

      <Button
        className="w-38 rounded-2xl px-4 py-2.5"
        onClick={handleSubmit}
        loading={loading}
        disabled={!stripe || !elements || loading}
        rightIcon={<MoveRight className="size-5 rtl:rotate-180" />}
      >
        {t('pay')}
      </Button>
    </div>
  );
}
