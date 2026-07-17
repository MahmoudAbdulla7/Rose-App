import { Check, Trash2 } from 'lucide-react';

import {
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/shared/ui/dropdown-menu';
import { cn } from '@/shared/lib/utils';
import type { Notification } from '@/features/user/lib/types/notification';
import { useTranslations } from 'next-intl';

interface NotificationItemProps {
  notification: Notification;
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  const tNotifications = useTranslations('header.notifications');

  return (
    <div key={notification.id}>
      <DropdownMenuItem
        className={cn('flex cursor-pointer flex-col p-4', notification.isRead && 'bg-ds-soft')}
      >
        <div className="flex w-full justify-between">
          {/* Title */}
          <p className="text-ds-text-plain font-semibold">{notification.title}</p>

          {/* Sub dropdown */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger />

            {/* Mark as read */}
            <DropdownMenuSubContent className="w-52">
              <DropdownMenuItem
                nativeButton
                render={
                  <button
                    className={cn(
                      'text-ds-text-plain flex w-full cursor-pointer gap-2.5 font-medium',
                      notification.isRead && 'text-zinc-400',
                    )}
                  />
                }
              >
                <Check size={18} strokeWidth={1.5} />
                <span>{tNotifications('markRead')}</span>
              </DropdownMenuItem>

              {/* Delete */}
              <DropdownMenuItem
                nativeButton
                render={<button className="flex w-full cursor-pointer gap-2.5" />}
              >
                <Trash2 size={18} strokeWidth={1.5} className="text-ds-danger" />
                <span className="text-ds-text-plain font-medium">{tNotifications('delete')}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
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
