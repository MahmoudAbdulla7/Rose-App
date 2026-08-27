'use client';

import { PAYMENT_METHOD_OPTIONS } from '../lib/constants/payment-method-options.constant';
import type { IPaymentMethod } from '../lib/types/checkout';
import PaymentMethodCard from './payment-method-card';

type PaymentMethodSelectorProps = {
  paymentMethod: IPaymentMethod;
  onSelect: (method: IPaymentMethod) => void;
};

export default function PaymentMethodSelector({
  paymentMethod,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <div className="flex w-full gap-4 p-2.5">
      {PAYMENT_METHOD_OPTIONS.map((method) => (
        <PaymentMethodCard
          key={method.id}
          method={method}
          isSelected={paymentMethod === method.id}
          onSelect={() => onSelect(method.id)}
        />
      ))}
    </div>
  );
}
