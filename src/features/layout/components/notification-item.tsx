'use client';

import { Check, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cn } from '@/shared/lib/utils';
import { DropdownMenuSeparator, DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { deleteNotificationAction } from '@/features/layout/lib/actions/delete-notification.action';
import { markNotificationReadAction } from '@/features/layout/lib/actions/mark-as-read.action';
import type { Notification } from '@/features/layout/lib/types/notification';

interface NotificationItemProps {
  notification: Notification;
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  // Translation
  const tNotifications = useTranslations('header.notifications');

  // Query
  const queryClient = useQueryClient();

  // Mutation
  const markNotificationReadMutation = useMutation({
    mutationFn: markNotificationReadAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: deleteNotificationAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    },
  });

  return (
    <div key={notification.id}>
      <DropdownMenuItem
        className={cn(
          'flex min-h-30.5 cursor-pointer flex-col p-4',
          notification.isRead && 'bg-ds-soft',
        )}
      >
        <div className="flex w-full justify-between">
          {/* Title */}
          <p className="text-ds-text-plain font-semibold">{notification.title}</p>

          <div className="flex items-center gap-1">
            {/* Mark as read */}
            {!notification.isRead && (
              <button
                type="button"
                onClick={() => markNotificationReadMutation.mutate(notification.id)}
                disabled={markNotificationReadMutation.isPending}
                className="text-ds-primary-saturated hover:bg-ds-soft cursor-pointer rounded-md p-1.5 transition-colors"
                aria-label={tNotifications('markRead')}
                title={tNotifications('markRead')}
              >
                <Check size={16} strokeWidth={2} />
              </button>
            )}

            {/* Delete */}
            <button
              type="button"
              onClick={() => deleteNotificationMutation.mutate(notification.id)}
              disabled={deleteNotificationMutation.isPending}
              className="text-ds-danger hover:bg-ds-soft cursor-pointer rounded-md p-1.5 transition-colors"
              aria-label={tNotifications('delete')}
              title={tNotifications('delete')}
            >
              <Trash2 size={16} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Message */}
        <p className="line-clamp-3 w-full text-start text-sm text-zinc-500 dark:text-zinc-400">
          {notification.message}
        </p>
      </DropdownMenuItem>

      <DropdownMenuSeparator />
    </div>
  );
}
