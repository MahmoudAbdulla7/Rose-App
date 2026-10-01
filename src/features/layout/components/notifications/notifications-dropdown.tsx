'use client';

import { Bell } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

import { useNotifications } from '@/features/layout/hooks/use-notifications';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { useAuth } from '@/shared/hooks';
import { NotificationsContent } from './notifications-content';

export default function NotificationsDropdown() {
  // Translation
  const t = useTranslations('header.notifications');

  // Custom hooks
  const { user, isAuthenticated } = useAuth();
  const { data, fetchNextPage, hasNextPage, refetch, isFetchingNextPage, error, isLoading } =
    useNotifications({ enabled: isAuthenticated });

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

  if (!isAuthenticated || !user) {
    return (
      <div className="text-ds-text-default hidden p-2 lg:inline-flex">
        <Bell className="size-5" />
      </div>
    );
  }

  return (
    <DropdownMenu onOpenChange={(open) => open && refetch()}>
      <DropdownMenuTrigger
        render={
          <button className="group text-ds-text-default relative hidden cursor-pointer items-center p-2 lg:inline-flex" />
        }
      >
        <Bell className="size-5" />

        {!error && unreadCount > 0 && (
          <span className="bg-ds-danger text-ds-text-inverse absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-xs leading-none font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-96" align="start">
        {/* Header */}
        <div className="bg-ds-primary-saturated text-ds-text-inverse p-4 text-xl font-bold">
          {t('title')}
          {!error && ` (${unreadCount})`}
        </div>

        <NotificationsContent
          error={error}
          notifications={notifications}
          unreadCount={unreadCount}
          hasNotifications={hasNotifications}
          isLoading={isLoading}
          handleScroll={handleScroll}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
