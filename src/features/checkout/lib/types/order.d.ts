import type { IPaymentMethod } from './checkout';

export type ICreateOrderPayload = {
  addressId: string;
  paymentMethod: IPaymentMethod;
  couponCode?: string;
  notes?: string;
  successUrl?: string;
  cancelUrl?: string;
};

export type IOrderCheckout = {
  checkoutUrl: string;
  sessionId: string;
  expiresAt: string;
};

export type IOrder = {
  id: string;
  paymentMethod: IPaymentMethod;
  paymentStatus: string;
};

export type ICreateOrderResult = {
  order: IOrder;
  checkout?: IOrderCheckout;
};

export type ICreateOrderResponse = IAPIResponse<ICreateOrderResult>;
