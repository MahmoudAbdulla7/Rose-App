'use client';

import { useMemo } from 'react';
import { Bell, BellOff, BrushCleaning, CheckCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu';
import { useNotifications } from '@/features/user/lib/hooks/use-notification';
import { markAllNotificationsReadAction } from '@/features/user/lib/actions/mark-as-read.action';
import { deleteAllNotificationsAction } from '@/features/user/lib/actions/delete-notification.action';
import NotificationItem from './notification-item';

export default function Notifications() {
  // Translation
  const tNotifications = useTranslations('header.notifications');

  // Query
  const queryClient = useQueryClient();

  // Mutation
  const markAllReadMutation = useMutation({
    mutationFn: markAllNotificationsReadAction,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    },
  });

  const deleteAllNotificationsMutation = useMutation({
    mutationFn: deleteAllNotificationsAction,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    },
  });

  // Custom hooks
  const { data, fetchNextPage, hasNextPage, refetch, isFetchingNextPage } = useNotifications();

  // Variables
  const notifications = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);
  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications],
  );

  // Functions
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    const reachedBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 20;

    if (reachedBottom && hasNextPage && !isFetchingNextPage) {
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
        {unreadCount > 0 && (
          <span className="bg-ds-danger text-ds-text-inverse absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-xs leading-none font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      {/* Dropdown */}
      <DropdownMenuContent className="w-96">
        {/* Header */}
        <div className="bg-ds-primary-saturated text-ds-text-inverse p-4 text-xl font-bold">
          {tNotifications('title')} ({unreadCount})
        </div>

        {notifications.length === 0 ? (
          <>
            {/* Empty, header */}
            <div className="flex cursor-default justify-between p-2.5 text-xs text-zinc-400">
              {/* Clear all */}
              <div className="flex items-center gap-1.5">
                <BrushCleaning size={18} strokeWidth={1.5} />
                <span>{tNotifications('clearAll')}</span>
              </div>

              {/* Mark all as read */}
              <div className="flex items-center gap-1.5">
                <CheckCheck size={15} strokeWidth={1.5} />
                <span>{tNotifications('markAllRead')}</span>
              </div>
            </div>

            <DropdownMenuSeparator />

            {/* Body */}
            <div className="flex flex-col items-center gap-2.5 py-20 text-zinc-500">
              <BellOff size={50} strokeWidth={1} />
              <span>{tNotifications('empty')}</span>
            </div>
          </>
        ) : (
          <>
            {/* Not empty, header */}
            <div className="text-ds-text-plain flex cursor-default justify-between p-2.5 text-xs">
              {/* Clear all */}
              <button
                type="button"
                onClick={() => deleteAllNotificationsMutation.mutate()}
                disabled={deleteAllNotificationsMutation.isPending}
                className="flex cursor-pointer items-center gap-1.5 hover:text-zinc-950 dark:hover:text-zinc-200"
              >
                <BrushCleaning size={18} strokeWidth={1.5} />
                <span>{tNotifications('clearAll')}</span>
              </button>

              {/* Mark all as read */}
              <button
                type="button"
                onClick={() => markAllReadMutation.mutate()}
                disabled={unreadCount === 0 || markAllReadMutation.isPending}
                className="flex cursor-pointer items-center gap-1.5 hover:text-zinc-950 disabled:cursor-default disabled:opacity-50 dark:hover:text-zinc-200"
              >
                <CheckCheck size={15} strokeWidth={1.5} />
                <span>{tNotifications('markAllRead')}</span>
              </button>
            </div>

            <DropdownMenuSeparator />

            {/* Body */}
            <div onScroll={handleScroll} className="max-h-120 overflow-x-hidden overflow-y-auto">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
