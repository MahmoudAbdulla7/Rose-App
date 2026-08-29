import { loadStripe, type Stripe, type StripeCardElementOptions } from '@stripe/stripe-js';

import {
  STRIPE_CARD_ELEMENT_COLORS
} from '../constants/stripe-card-element.constant';

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripePublishableKey(): string | undefined {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
}

export function getStripePromise(): Promise<Stripe | null> | null {
  const key = getStripePublishableKey();
  if (!key) return null;

  if (!stripePromise) {
    stripePromise = loadStripe(key);
  }

  return stripePromise;
}

export function isStripeElementsEnabled(): boolean {
  return Boolean(getStripePublishableKey());
}

export function getStripeCardElementOptions(isDark: boolean): StripeCardElementOptions {
  const colors = isDark ? STRIPE_CARD_ELEMENT_COLORS.dark : STRIPE_CARD_ELEMENT_COLORS.light;

  return {
    style: {
      base: {
        fontSize: "16px",
        color: colors.text,
        backgroundColor: colors.background,
        iconColor: colors.icon,
        '::placeholder': {
          color: colors.placeholder,
        },
      },
      invalid: {
        color: STRIPE_CARD_ELEMENT_COLORS.invalid.text,
        iconColor: STRIPE_CARD_ELEMENT_COLORS.invalid.icon,
      },
    },
  };
}
