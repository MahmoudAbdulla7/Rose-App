'use client';

import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { registerPushSubscriptionAction } from '../lib/actions/push-notifications.action';
import { urlBase64ToUint8Array } from '../lib/utils/push-notifications.utils';

type UsePushNotificationsProps = {
  pushConfigured: boolean;
  vapidPublicKey: string;
};

export function usePushNotifications({
  pushConfigured,
  vapidPublicKey,
}: UsePushNotificationsProps) {
  const t = useTranslations('header.notifications');

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(true);
  const [isEnabling, setIsEnabling] = useState(false);

  const registerSubscriptionMutation = useMutation({
    mutationFn: registerPushSubscriptionAction,
  });

  useEffect(() => {
    let cancelled = false;

    const checkSubscription = async () => {
      if (
        !pushConfigured ||
        !('serviceWorker' in navigator) ||
        !('PushManager' in window) ||
        !('Notification' in window)
      ) {
        setIsSubscribed(false);
        setIsCheckingSubscription(false);
        return;
      }

      try {
        const registration = await navigator.serviceWorker.getRegistration('/sw.js');
        const subscription = await registration?.pushManager.getSubscription();

        if (!cancelled) {
          setIsSubscribed(Boolean(subscription));
        }
      } catch {
        if (!cancelled) {
          toast.error(t('checkSubscriptionError'));
        }
      } finally {
        if (!cancelled) {
          setIsCheckingSubscription(false);
        }
      }
    };

    setIsCheckingSubscription(true);
    void checkSubscription();

    return () => {
      cancelled = true;
    };
  }, [pushConfigured, t]);

  const enablePush = useCallback(async () => {
    if (isEnabling || !pushConfigured || !vapidPublicKey) {
      return;
    }

    if (
      !('serviceWorker' in navigator) ||
      !('PushManager' in window) ||
      !('Notification' in window)
    ) {
      toast.error(t('pushNotSupported'));
      return;
    }

    let subscription: PushSubscription | null = null;

    try {
      setIsEnabling(true);

      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        toast.error(t('permissionDenied'));
        return;
      }

      const registration = await navigator.serviceWorker.register('/sw.js');
      const existingSubscription = await registration.pushManager.getSubscription();

      subscription =
        existingSubscription ??
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        }));

      await registerSubscriptionMutation.mutateAsync(subscription.toJSON());

      setIsSubscribed(true);
      toast.success(t('notificationsEnabled'));
    } catch {
      if (subscription) {
        try {
          await subscription.unsubscribe();
        } catch {
          // Ignore cleanup failure; preserve the original registration error.
        }
      }

      setIsSubscribed(false);
      toast.error(t('enableNotificationsError'));
    } finally {
      setIsEnabling(false);
    }
  }, [isEnabling, pushConfigured, vapidPublicKey, registerSubscriptionMutation, t]);

  return {
    isSubscribed,
    isCheckingSubscription,
    isEnabling,
    enablePush,
  };
}
