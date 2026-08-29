'use client';

import { Elements } from '@stripe/react-stripe-js';

import { getStripePromise } from '../lib/utils/stripe.utils';
import StripeCardForm from './stripe-card-form';

type Step2StripeFormProps = {
  clientSecret: string;
  paymentIntentId: string;
};

export default function Step2StripeForm({ clientSecret, paymentIntentId }: Step2StripeFormProps) {
  const stripePromise = getStripePromise();

  if (!stripePromise) return null;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripeCardForm paymentIntentId={paymentIntentId} />
    </Elements>
  );
}
