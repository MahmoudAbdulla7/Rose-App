'use server';

import {
  deletePushSubscription,
  registerPushSubscription,
} from '@/features/layout/lib/apis/push-notifications.api';

export async function registerPushSubscriptionAction(subscription: PushSubscriptionJSON) {
  return registerPushSubscription(subscription);
}

export async function deletePushSubscriptionAction(endpoint: string) {
  return deletePushSubscription(endpoint);
}
