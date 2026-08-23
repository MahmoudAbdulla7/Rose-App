import { PAYMENT_METHODS } from './payment-methods.constants';

import type { PaymentMethodOption } from '../types/checkout';

export const PAYMENT_METHOD_OPTIONS: PaymentMethodOption[] = [
  {
    id: PAYMENT_METHODS.CASH_ON_DELIVERY,
    icon: '/assets/images/payment/cash-on-delivery.svg',
    titleKey: 'cashOnDelivery',
    descriptionKey: 'cashDescription',
  },
  {
    id: PAYMENT_METHODS.CREDIT_CARD,
    icon: '/assets/images/payment/credit-card.svg',
    titleKey: 'creditCard',
    descriptionKey: 'creditDescription',
  },
];
