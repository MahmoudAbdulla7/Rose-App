'use client';

import { useMemo } from 'react';
import { Bell, BellOff, BrushCleaning, Check, CheckCheck, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/shared/ui/dropdown-menu';
import { cn } from '@/shared/lib/utils';
import { useNotifications } from '@/features/user/lib/hooks/use-notification';

export default function Notifications() {
  // Translation
  const tNotifications = useTranslations('header.notifications');

  // Custom hooks
  const { data } = useNotifications();

  // Variables
  const notifications = useMemo(() => data?.pages.flatMap((page) => page.data) || [], [data]);
  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications],
  );

  return (
    <DropdownMenu>
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

      <DropdownMenuContent className="w-96">
        {/* Header */}
        <div className="bg-ds-primary-saturated text-ds-text-inverse p-4 text-xl font-bold">
          {tNotifications('title')} ({unreadCount})
        </div>

        {notifications.length === 0 ? (
          <>
            {/* Empty */}
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
            {/* Not empty */}
            <div className="text-ds-text-plain flex cursor-default justify-between p-2.5 text-xs">
              {/* Clear all */}
              <div className="flex cursor-pointer items-center gap-1.5 hover:text-zinc-950 dark:hover:text-zinc-200">
                <BrushCleaning size={18} strokeWidth={1.5} />
                <span>{tNotifications('clearAll')}</span>
              </div>

              {/* Mark as read */}
              <div className="flex cursor-pointer items-center gap-1.5 hover:text-zinc-950 dark:hover:text-zinc-200">
                <CheckCheck size={15} strokeWidth={1.5} />
                <span>{tNotifications('markAllRead')}</span>
              </div>
            </div>

            <DropdownMenuSeparator />

            {/* Notifications dropdown */}
            {notifications.map((notification) => (
              <div key={notification.id}>
                <DropdownMenuItem
                  className={cn(
                    'flex cursor-pointer flex-col p-4',
                    notification.isRead && 'bg-ds-soft',
                  )}
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
                          <span className="text-ds-text-plain font-medium">
                            {tNotifications('delete')}
                          </span>
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
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
