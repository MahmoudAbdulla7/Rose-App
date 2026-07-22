'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAllNotificationsAction } from '@/features/layout/lib/actions/delete-notification.action';
import { markAllNotificationsReadAction } from '@/features/layout/lib/actions/mark-as-read.action';
import { BrushCleaning, CheckCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface NotificationsToolbarProps {
  hasNotifications: boolean;
  unreadCount: number;
  isLoading: boolean;
}

export default function NotificationsToolbar({
  hasNotifications,
  unreadCount,
  isLoading,
}: NotificationsToolbarProps) {
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

  return (
    <div className="text-ds-text-plain flex cursor-default justify-between p-2.5 text-xs">
      {/* Clear all */}
      <button
        type="button"
        onClick={() => deleteAllNotificationsMutation.mutate()}
        disabled={!hasNotifications || isLoading || deleteAllNotificationsMutation.isPending}
        className="flex cursor-pointer items-center gap-1.5 hover:text-zinc-950 disabled:cursor-default disabled:text-zinc-400 dark:hover:text-zinc-200"
      >
        <BrushCleaning size={18} strokeWidth={1.5} />
        <span>{tNotifications('clearAll')}</span>
      </button>

      {/* Mark all as read */}
      <button
        type="button"
        onClick={() => markAllReadMutation.mutate()}
        disabled={
          !hasNotifications || isLoading || markAllReadMutation.isPending || unreadCount === 0
        }
        className="flex cursor-pointer items-center gap-1.5 hover:text-zinc-950 disabled:cursor-default disabled:text-zinc-400 dark:hover:text-zinc-200"
      >
        <CheckCheck size={15} strokeWidth={1.5} />
        <span>{tNotifications('markAllRead')}</span>
      </button>
    </div>
  );
}
