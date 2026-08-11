import { BellOff } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { DropdownMenuSeparator } from '@/shared/ui/dropdown-menu';
import NotificationsToolbar from './notifications-toolbar';
import NotificationItemSkeleton from '../../skeletons/notification-item.skeleton';
import NotificationItem from './notification-item';
import type { Notification } from '../../lib/types/notification';

interface NotificationsContentProps {
  error: Error | null;
  notifications: Notification[];
  unreadCount: number;
  hasNotifications: boolean;
  isLoading: boolean;
  handleScroll: React.UIEventHandler<HTMLDivElement>;
}

export function NotificationsContent({
  error,
  notifications,
  unreadCount,
  hasNotifications,
  isLoading,
  handleScroll,
}: NotificationsContentProps) {
  const tNotifications = useTranslations('header.notifications');

  if (error) {
    return (
      <div className="flex justify-center p-8">
        <p className="text-center text-sm">{tNotifications('error')}</p>
      </div>
    );
  }

  return (
    <>
      <NotificationsToolbar
        hasNotifications={hasNotifications}
        unreadCount={unreadCount}
        isLoading={isLoading}
      />

      <DropdownMenuSeparator />

      {!hasNotifications && !isLoading ? (
        // Empty state
        <div className="dark:bg-ds-default text-ds-text-muted flex flex-col items-center gap-2.5 py-20">
          <BellOff size={50} strokeWidth={1} />
          <span>{tNotifications('empty')}</span>
        </div>
      ) : (
        // Notifications list
        <div onScroll={handleScroll} className="max-h-120 overflow-x-hidden overflow-y-auto">
          {isLoading ? (
            <NotificationItemSkeleton count={4} />
          ) : (
            notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))
          )}
        </div>
      )}
    </>
  );
}
