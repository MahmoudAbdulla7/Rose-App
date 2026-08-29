'use client';

import { signOut } from 'next-auth/react';
import { EllipsisVertical, LogOut, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import {
  getAvatarFallbackColor,
  getUserInitials,
} from '@/features/dashboard/lib/utils/user-avatar';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

type Props = {
  showDetails?: boolean;
};

export default function DashboardUserMenu({ showDetails = true }: Props) {
  // Translation
  const t = useTranslations('dashboard.userMenu');

  // Auth
  const { user } = useAuth();

  // Variables
  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim() ||
    user?.username ||
    '';
  const email = user?.email ?? '';
  const initials = getUserInitials(user?.firstName, user?.lastName);
  const seed = user?.id || user?.email || fullName || 'user';
  const fallbackColor = getAvatarFallbackColor(seed);
  const avatarSize = showDetails ? 'size-13' : 'size-10';

  const handleLogout = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <div className="flex items-center gap-2.5">
      {/* Avatar */}
      {user?.image ? (
        <Image
          src={user.image}
          alt={fullName || email}
          width={showDetails ? 52 : 40}
          height={showDetails ? 52 : 40}
          className={cn('shrink-0 rounded-full object-cover', avatarSize)}
          unoptimized={user.image.startsWith('http') === false}
        />
      ) : (
        <div
          aria-hidden
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full text-sm font-bold',
            avatarSize,
            fallbackColor.bg,
            fallbackColor.text,
          )}
        >
          {initials}
        </div>
      )}

      {/* Info */}
      {showDetails && (
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-ds-text-plain truncate text-sm font-bold">{fullName}</span>
          <span className="text-ds-text-soft truncate text-xs font-semibold">{email}</span>
        </div>
      )}

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={t('label')}
          render={
            <button
              type="button"
              className="text-ds-text-plain hover:bg-ds-subtle flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md"
            />
          }
        >
          <EllipsisVertical className="size-4.5" />
        </DropdownMenuTrigger>

        <DropdownMenuContent side="top" align="end" sideOffset={8} className="min-w-44">
          <DropdownMenuItem render={<Link href="/profile" className="flex w-full cursor-pointer gap-2" />}>
            <User size={16} strokeWidth={1.5} />
            <span className="text-ds-text-plain font-medium">{t('account')}</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            nativeButton
            render={<button type="button" onClick={handleLogout} className="flex w-full cursor-pointer gap-2" />}
          >
            <LogOut size={16} strokeWidth={1.5} />
            <span className="text-ds-text-plain font-medium">{t('logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
