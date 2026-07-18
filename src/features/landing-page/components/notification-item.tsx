'use client';

import { Check } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cn } from '@/shared/lib/utils';
import { DropdownMenuSeparator, DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import type { Notification } from '@/features/user/lib/types/notification';

import { markNotificationReadAction } from '@/features/user/lib/actions/mark-as-read.action';

interface NotificationItemProps {
  notification: Notification;
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  const queryClient = useQueryClient();

  const markNotificationReadMutation = useMutation({
    mutationFn: markNotificationReadAction,
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

          {/* Mark as read */}
          {!notification.isRead && (
            <button
              type="button"
              onClick={() => markNotificationReadMutation.mutate(notification.id)}
              disabled={markNotificationReadMutation.isPending}
              className="text-ds-primary-saturated hover:text-ds-primary cursor-pointer text-xs font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Check size={16} strokeWidth={2} />
            </button>
          )}
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
