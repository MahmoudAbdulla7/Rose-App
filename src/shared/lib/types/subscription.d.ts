export interface ISubscription extends IDBFields {
  email: string;
}

export type SubscriptionResponse = IAPIResponse<{ subscription: ISubscription }>;
