'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserDataAction } from '@/features/user/lib/actions/get-user-data.action';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/shared/ui/dropdown-menu';
import { User, Settings, LogOut, ChevronDown, MapPinHouse, ScrollText } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function HeaderDropdown() {
  const { data: user } = useQuery({
    queryKey: ['user-data'],
    queryFn: getUserDataAction,
  });

  const handleSignOut = () => {};

  return (
    <div className="flex">
      <div className="flex flex-col">
        <span className="text-xs text-zinc-500">Hello</span>

        <span className="text-ds-primary-saturated font-medium">{user?.firstName}</span>
      </div>

      <DropdownMenu>
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
          <DropdownMenuItem className="text-ds-primary-saturated hover:text-ds-primary-saturated dark:hover:text-ds-primary-saturated font-semibold hover:bg-transparent dark:hover:bg-transparent">
            {user?.firstName + ' ' + user?.lastName}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            render={<Link href="/account" className="flex w-full cursor-pointer gap-2" />}
          >
            <User size={16} strokeWidth={1.5} />
            <span className="font-medium">Account</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/addresses" className="flex w-full cursor-pointer gap-2" />}
          >
            <MapPinHouse size={16} strokeWidth={1.5} />
            <span className="font-medium">Addresses</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/orders" className="flex w-full cursor-pointer gap-2" />}
          >
            <ScrollText size={16} strokeWidth={1.5} />
            <span className="font-medium">Orders</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            render={<Link href="/dashboard" className="flex w-full cursor-pointer gap-2" />}
          >
            <Settings size={16} strokeWidth={1.5} />
            <span className="font-medium">Dashboard</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            nativeButton
            onClick={handleSignOut}
            render={<button className="flex w-full cursor-pointer gap-2" />}
          >
            <LogOut size={16} strokeWidth={1.5} />
            <span className="font-medium">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
