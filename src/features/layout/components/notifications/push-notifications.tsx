'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import { usePushNotifications } from '@/features/layout/hooks/use-push-notifications';

type PushNotificationsProps = {
  pushConfigured: boolean;
  vapidPublicKey: string;
};

export default function PushNotifications({
  pushConfigured,
  vapidPublicKey,
}: PushNotificationsProps) {
  // Translation
  const t = useTranslations('header.notifications');

  // Custom hooks
  const { isSubscribed, isCheckingSubscription, isEnabling, enablePush } = usePushNotifications({
    pushConfigured,
    vapidPublicKey,
  });

  if (!pushConfigured || isSubscribed || isCheckingSubscription) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={enablePush}
      disabled={isEnabling}
      className="text-ds-plain hover:text-ds-muted h-auto p-0 text-xs hover:bg-transparent dark:hover:bg-transparent"
    >
      {isEnabling ? t('enablingNotifications') : t('enableNotifications')}
    </Button>
  );
}
