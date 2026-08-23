import { PAYMENT_METHODS } from "../constants/payment-methods.constants";
import { ORDER_STATUS } from "../constants/order-status.constant";

export type IPaymentMethod = typeof PAYMENT_METHODS[keyof typeof PAYMENT_METHODS];

export type IOrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];

export type CheckoutPhase =
  | { phase: 'idle' }
  | { phase: 'stripe-form'; clientSecret: string; paymentIntentId: string };

export type PaymentMethodOption = {
  id: IPaymentMethod;
  icon: string;
  titleKey: 'cashOnDelivery' | 'creditCard';
  descriptionKey: 'cashDescription' | 'creditDescription';
};