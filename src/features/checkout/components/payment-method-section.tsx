'use client';

import Image from 'next/image';
import { MoveRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { CheckboxButton } from '@/shared/components/checkbox-button';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

type PaymentMethod = 'cash' | 'credit';

export default function PaymentMethodSection() {
  const t = useTranslations('checkout.paymentMethod');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit');

  const selectMethod = (method: PaymentMethod) => (checked: boolean) => {
    if (checked) setPaymentMethod(method);
  };

  return (
    <section className="flex w-full flex-col gap-3 rounded-2xl">
      <fieldset className="m-0 w-full max-w-195.5 min-w-0 border-0 p-0">
        <legend className="sr-only">{t('fieldsetLabel')}</legend>

        <div className="flex w-full flex-col items-stretch gap-4 p-2.5 sm:flex-row">
          <CheckboxButton
            value="cash"
            checked={paymentMethod === 'cash'}
            onCheckedChange={selectMethod('cash')}
            className="h-full min-h-0 flex-1"
          >
            <span className="pointer-events-none flex size-48.75 shrink-0 items-center justify-center overflow-hidden">
              <Image
                src="/assets/images/checkout/cash-on-delivery.png"
                alt=""
                width={195}
                height={195}
                className="size-full object-cover"
                priority
              />
            </span>
            <span
              className={cn(
                'text-ds-text-plain line-clamp-1 text-center text-2xl leading-none font-semibold',
                'group-data-checked/checkbox-button:text-ds-primary',
              )}
            >
              {t('cash.title')}
            </span>
            <span className="text-ds-text-soft line-clamp-2 h-[2lh] w-full text-center text-sm leading-normal font-semibold">
              {t('cash.description')}
            </span>
          </CheckboxButton>

          <CheckboxButton
            value="credit"
            checked={paymentMethod === 'credit'}
            onCheckedChange={selectMethod('credit')}
            className="h-full min-h-0 flex-1"
          >
            <span className="pointer-events-none flex size-48.75 shrink-0 items-center justify-center overflow-hidden">
              <Image
                src="/assets/images/checkout/credit-card.png"
                alt=""
                width={195}
                height={195}
                className="size-full object-cover opacity-90"
                priority
              />
            </span>
            <span
              className={cn(
                'text-ds-text-plain line-clamp-1 text-center text-2xl leading-none font-semibold',
                'group-data-checked/checkbox-button:text-ds-primary',
              )}
            >
              {t('credit.title')}
            </span>
            <span className="text-ds-text-soft line-clamp-2 h-[2lh] w-full text-center text-sm leading-normal font-semibold">
              {t('credit.description')}
            </span>
          </CheckboxButton>
        </div>
      </fieldset>

      <hr className="m-0 w-full border-0 border-t border-zinc-100" />

      <Button
        type="button"
        variant="primary"
        className="h-auto max-h-10.25 w-38 gap-2.5 self-end rounded-xl px-4 py-2.5 text-sm leading-normal font-semibold"
        rightIcon={<MoveRight className="size-5 rtl:rotate-180" aria-hidden />}
      >
        {t('checkout')}
      </Button>
    </section>
  );
}
