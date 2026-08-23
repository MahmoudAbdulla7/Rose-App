export type ICreatePaymentIntentPayload = {
  orderId: string;
};

export type ICreatePaymentIntentResult = {
  clientSecret: string;
  paymentIntentId: string;
};

export type ICreatePaymentIntentResponse = IAPIResponse<ICreatePaymentIntentResult>;

export type IConfirmPaymentPayload = {
  paymentIntentId: string;
  paymentMethodId: string;
};

export type IConfirmPaymentResult = {
  paymentIntent: {
    id: string;
    status: string;
    clientSecret: string;
  };
  order: {
    id: string;
    paymentStatus: string;
  };
};

export type IConfirmPaymentResponse = IAPIResponse<IConfirmPaymentResult>;

export type ICheckoutSessionResult = {
  sessionId: string;
  paymentStatus: string;
  sessionStatus: string;
  amountTotal: number;
  currency: string;
  order: {
    orderId: string;
    paymentStatus: string;
  };
};

export type ICheckoutSessionResponse = IAPIResponse<ICheckoutSessionResult>;
