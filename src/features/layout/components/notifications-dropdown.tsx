'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Bell, BellOff, BrushCleaning, CheckCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { useNotifications } from '@/features/layout/hooks/use-notification';
import { deleteAllNotificationsAction } from '@/features/layout/lib/actions/delete-notification.action';
import { markAllNotificationsReadAction } from '@/features/layout/lib/actions/mark-as-read.action';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu';
import NotificationItem from './notification-item';
import NotificationItemSkeleton from '../skeletons/notification-item.skeleton';

export default function NotificationsDropdown() {
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

        {/* Error */}
        {error ? (
          <div className="flex justify-center p-8">
            <p className="text-center text-sm">{tNotifications('error')}</p>
          </div>
        ) : notifications.length === 0 && !isLoading ? (
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
                disabled={
                  !hasNotifications || isLoading || deleteAllNotificationsMutation.isPending
                }
                className="flex cursor-pointer items-center gap-1.5 hover:text-zinc-950 disabled:cursor-default disabled:text-zinc-400 dark:hover:text-zinc-200"
              >
                <BrushCleaning size={18} strokeWidth={1.5} />
                <span>{tNotifications('clearAll')}</span>
              </button>

              {/* Mark all as read */}
              <button
                type="button"
                onClick={() => markAllReadMutation.mutate()}
                disabled={isLoading || unreadCount === 0 || markAllReadMutation.isPending}
                className="flex cursor-pointer items-center gap-1.5 hover:text-zinc-950 disabled:cursor-default disabled:text-zinc-400 dark:hover:text-zinc-200"
              >
                <CheckCheck size={15} strokeWidth={1.5} />
                <span>{tNotifications('markAllRead')}</span>
              </button>
            </div>

            <DropdownMenuSeparator />

            {/* Body */}
            <div onScroll={handleScroll} className="max-h-120 overflow-x-hidden overflow-y-auto">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <NotificationItemSkeleton key={index} />
                  ))
                : notifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
