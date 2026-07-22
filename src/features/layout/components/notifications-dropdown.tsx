'use client';

import { Bell, BellOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { useNotifications } from '@/features/layout/hooks/use-notification';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu';
import NotificationItem from './notification-item';
import NotificationItemSkeleton from '../skeletons/notification-item.skeleton';
import NotificationsToolbar from './notifications-toolbar';

export default function NotificationsDropdown() {
  // Translation
  const tNotifications = useTranslations('header.notifications');

  // Custom hooks
  const { data, fetchNextPage, hasNextPage, refetch, isFetchingNextPage, error, isLoading } =
    useNotifications();

  // Variables
  const notifications = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);
  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications],
  );
  const hasNotifications = notifications.length > 0;

  // Functions
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    const reachedBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 20;

    if (reachedBottom && hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          refetch();
        }
      }}
    >
      {/* Trigger */}
      <DropdownMenuTrigger
        render={
          <button className="group text-muted-foreground hover:text-foreground relative cursor-pointer items-center p-1" />
        }
      >
        <Bell strokeWidth={1.5} className="cursor-pointer" />

        {/* Count */}
        {!error && unreadCount > 0 && (
          <span className="bg-ds-danger text-ds-text-inverse absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-xs leading-none font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      {/* Dropdown */}
      <DropdownMenuContent className="w-96">
        {/* Header */}
        <div className="bg-ds-primary-saturated text-ds-text-inverse p-4 text-xl font-bold">
          {tNotifications('title')}
          {!error && ` (${unreadCount})`}
        </div>

        {/* Body */}
        {error ? (
          <div className="flex justify-center p-8">
            <p className="text-center text-sm">{tNotifications('error')}</p>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <NotificationsToolbar
              hasNotifications={hasNotifications}
              unreadCount={unreadCount}
              isLoading={isLoading}
            />

            <DropdownMenuSeparator />

            {/* Content */}
            {!hasNotifications && !isLoading ? (
              // Empty state
              <div className="flex flex-col items-center gap-2.5 py-20 text-zinc-500">
                <BellOff size={50} strokeWidth={1} />
                <span>{tNotifications('empty')}</span>
              </div>
            ) : (
              // Notifications list
              <div onScroll={handleScroll} className="max-h-120 overflow-x-hidden overflow-y-auto">
                {isLoading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <NotificationItemSkeleton key={index} />
                    ))
                  : notifications.map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
              </div>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
