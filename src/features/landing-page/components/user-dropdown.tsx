'use client';

import { useQuery } from '@tanstack/react-query';
import { User, Settings, LogOut, ChevronDown, MapPinHouse, ScrollText } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { getUserDataAction } from '@/features/user/lib/actions/get-user-data.action';
import { Link } from '@/i18n/navigation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/shared/ui/dropdown-menu';

export default function HeaderDropdown() {
  const tGreeting = useTranslations('header.greeting');
  const tUserMenu = useTranslations('header.userMenu');

  const menuItemClasses =
    'text-ds-text-plain flex w-full items-center gap-2 font-medium cursor-pointer';

  const { data: user } = useQuery({
    queryKey: ['user-data'],
    queryFn: getUserDataAction,
  });

  return (
    <div className="flex">
      <div className="flex flex-col">
        {/* Greeting */}
        <span className="text-xs text-zinc-500"> {tGreeting('hello')}</span>
        <span className="text-ds-primary-saturated font-medium">{user?.firstName}</span>
      </div>

      <DropdownMenu>
        {/* Trigger */}
        <DropdownMenuTrigger
          render={
            <button className="group text-muted-foreground hover:text-foreground cursor-pointer items-center p-1" />
          }
        >
          <ChevronDown
            size={18}
            strokeWidth={1.5}
            className="transition-transform duration-300 ease-in-out group-data-popup-open:rotate-180"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          {/* Name */}
          <div className="text-ds-primary-saturated hover:text-ds-primary-saturated dark:hover:text-ds-primary-saturated px-2 py-1.5 font-semibold hover:bg-transparent dark:hover:bg-transparent">
            {user?.firstName ?? ''} {user?.lastName ?? ''}
          </div>

          <DropdownMenuSeparator />

          {/* Account */}
          <DropdownMenuItem render={<Link href="#" className={menuItemClasses} />}>
            <User size={16} strokeWidth={1.5} />
            <span>{tUserMenu('account')}</span>
          </DropdownMenuItem>

          {/* Addresses */}
          <DropdownMenuItem render={<Link href="#" className={menuItemClasses} />}>
            <MapPinHouse size={16} strokeWidth={1.5} />
            <span>{tUserMenu('addresses')}</span>
          </DropdownMenuItem>

          {/* Orders */}
          <DropdownMenuItem render={<Link href="#" className={menuItemClasses} />}>
            <ScrollText size={16} strokeWidth={1.5} />
            <span>{tUserMenu('orders')}</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Dashboard */}
          {user?.role === 'ADMIN' && (
            <>
              <DropdownMenuItem render={<Link href="#" className={menuItemClasses} />}>
                <Settings size={16} strokeWidth={1.5} />
                <span>{tUserMenu('dashboard')}</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
            </>
          )}

          {/* Log out */}
          <DropdownMenuItem
            nativeButton
            render={<button className="flex w-full cursor-pointer gap-2" />}
          >
            <LogOut size={16} strokeWidth={1.5} />
            <span className="text-ds-text-plain font-medium">{tUserMenu('logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
