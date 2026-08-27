'use client';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';

import { useConfirmPayment } from './use-confirm-payment';
import { ORDER_STATUS } from '../lib/constants/order-status.constant';
import { CART_OPTIONS } from '@/shared/lib/apis/cart/cart.options';
import { useQueryClient } from '@tanstack/react-query';

type UseStripeCardPaymentParams = {
  paymentIntentId: string;
};

export function useStripeCardPayment({ paymentIntentId }: UseStripeCardPaymentParams) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations('checkout');
  const { mutateAsync: confirmPayment, isPending } = useConfirmPayment();
  const [isProcessing, setIsProcessing] = useState(false);

  const redirectToCancel = () => {
    toast.error(t('paymentError'));
    router.push('/checkout/cancel');
  };

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      redirectToCancel();
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error || !paymentMethod) {
        // toast.error(error?.message ?? t('paymentError'));
        router.push('/checkout/cancel');
        return;
      }

      const response = await confirmPayment({
        paymentIntentId,
        paymentMethodId: paymentMethod.id,
      });

      if (!response.status) {
        redirectToCancel();
        return;
      }

      if (ORDER_STATUS.SUCCESSED === response.payload.order.paymentStatus) {
        toast.success(t('orderSuccess'));
        router.push('/orders');
      } else {
        redirectToCancel();
      }
    } catch {
      redirectToCancel();
    } finally {
      queryClient.invalidateQueries({ queryKey: CART_OPTIONS.QUERY_KEY });
      setIsProcessing(false);
    }
  };

  return {
    stripe,
    elements,
    handleSubmit,
    loading: isPending || isProcessing,
  };
}
