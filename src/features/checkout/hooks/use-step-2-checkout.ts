'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';

import { useCreateOrder } from './use-create-order';
import { useCreatePaymentIntent } from './use-create-payment-intent';
import { PAYMENT_METHODS } from '../lib/constants/payment-methods.constants';
import type { CheckoutPhase, IPaymentMethod } from '../lib/types/checkout';
import { getStripePromise, isStripeElementsEnabled } from '../lib/utils/stripe.utils';

type UseStep2CheckoutParams = {
  selectedAddressId: string | null;
  couponCode?: string | null;
};

export function useStep2Checkout({ selectedAddressId, couponCode }: UseStep2CheckoutParams) {
  // Translation
  const t = useTranslations('checkout');

  // Navigation
  const router = useRouter();

  // State
  const [paymentMethod, setPaymentMethod] = useState<IPaymentMethod>(
    PAYMENT_METHODS.CREDIT_CARD,
  );
  const [checkoutPhase, setCheckoutPhase] = useState<CheckoutPhase>({ phase: 'idle' });

  // Mutations
  const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder();
  const { mutateAsync: createPaymentIntent, isPending: isCreatingIntent } =
    useCreatePaymentIntent();

  // Variables
  const isLoading = isCreatingOrder || isCreatingIntent;
  const stripePromise = getStripePromise();
  const useStripeElements = isStripeElementsEnabled();

  const stripeForm =
    checkoutPhase.phase === 'stripe-form' &&
      paymentMethod === PAYMENT_METHODS.CREDIT_CARD &&
      stripePromise
      ? {
        clientSecret: checkoutPhase.clientSecret,
        paymentIntentId: checkoutPhase.paymentIntentId,
      }
      : null;

  // Handlers
  const redirectToCancel = () => {
    toast.error(t('paymentError'));
    router.push('/checkout/cancel');
  };

  const handlePaymentMethodSelect = (method: IPaymentMethod) => {
    setPaymentMethod(method);

    if (method !== PAYMENT_METHODS.CREDIT_CARD) {
      setCheckoutPhase({ phase: 'idle' });
    }
  };

  const handleHostedCheckoutRedirect = (checkoutUrl?: string) => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
      return;
    }

    redirectToCancel();
  };

  const handleCreditCardFlow = async (orderId: string, checkoutUrl?: string) => {
    if (!useStripeElements) {
      handleHostedCheckoutRedirect(checkoutUrl);
      return;
    }

    if (!stripePromise) {
      redirectToCancel();
      return;
    }

    const stripe = await stripePromise;
    if (!stripe) {
      redirectToCancel();
      return;
    }

    try {
      const intentResponse = await createPaymentIntent(orderId);
      if (!intentResponse.status) {
        redirectToCancel();
        return;
      }

      const { clientSecret, paymentIntentId } = intentResponse.payload;
      setCheckoutPhase({ phase: 'stripe-form', clientSecret, paymentIntentId });
    } catch {
      redirectToCancel();
    }
  };

  const handleCheckout = async () => {
    if (!selectedAddressId) {
      redirectToCancel();
      return;
    }

    try {
      const origin = window.location.origin;
      const orderResponse = await createOrder({
        addressId: selectedAddressId,
        paymentMethod,
        successUrl: `${origin}/orders`,
        cancelUrl: `${origin}/checkout/cancel`,
        ...(couponCode ? { couponCode } : {}),
      });

      if (!orderResponse.status) {
        redirectToCancel();
        return;
      }

      const { order, checkout } = orderResponse.payload;

      if (paymentMethod === PAYMENT_METHODS.CASH_ON_DELIVERY) {
        toast.success(t('orderSuccess'));
        router.push('/orders');
        return;
      }

      await handleCreditCardFlow(order.id, checkout?.checkoutUrl);
    } catch {
      redirectToCancel();
    }
  };

  return {
    paymentMethod,
    stripeForm,
    isLoading,
    handlePaymentMethodSelect,
    handleCheckout,
  };
}
