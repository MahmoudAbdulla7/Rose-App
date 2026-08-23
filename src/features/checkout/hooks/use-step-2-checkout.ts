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
  const t = useTranslations('checkout');
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<IPaymentMethod>(
    PAYMENT_METHODS.CREDIT_CARD,
  );
  const [checkoutPhase, setCheckoutPhase] = useState<CheckoutPhase>({ phase: 'idle' });

  const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder();
  const { mutateAsync: createPaymentIntent, isPending: isCreatingIntent } =
    useCreatePaymentIntent();

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

    toast.error(t('paymentError'));
  };

  const handleCreditCardFlow = async (orderId: string, checkoutUrl?: string) => {
    if (!useStripeElements) {
      handleHostedCheckoutRedirect(checkoutUrl);
      return;
    }

    if (!stripePromise) {
      toast.error(t('paymentError'));
      return;
    }

    const stripe = await stripePromise;
    if (!stripe) {
      toast.error(t('paymentError'));
      return;
    }

    try {
      const intentResponse = await createPaymentIntent(orderId);
      if (!intentResponse.status) {
        toast.error(t('paymentError'));
        return;
      }

      const { clientSecret, paymentIntentId } = intentResponse.payload;
      setCheckoutPhase({ phase: 'stripe-form', clientSecret, paymentIntentId });
    } catch {
      toast.error(t('paymentError'));
    }
  };

  const handleCheckout = async () => {
    if (!selectedAddressId) {
      toast.error(t('paymentError'));
      return;
    }

    try {
      const orderResponse = await createOrder({
        addressId: selectedAddressId,
        paymentMethod,
        ...(couponCode ? { couponCode } : {}),
      });

      if (!orderResponse.status) {
        toast.error(t('paymentError'));
        return;
      }

      const { order, checkout } = orderResponse.payload;

      if (paymentMethod === PAYMENT_METHODS.CASH_ON_DELIVERY) {
        toast.success(t('orderSuccess'));
        router.push('/checkout/success');
        return;
      }

      await handleCreditCardFlow(order.id, checkout?.checkoutUrl);
    } catch {
      toast.error(t('paymentError'));
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
