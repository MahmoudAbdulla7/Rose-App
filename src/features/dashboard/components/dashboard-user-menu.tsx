'use client';

import { cn } from '@/shared/lib/utils';

type Props = {
  showDetails?: boolean;
};

// ponytail: static user until the session exposes name/email/image
const USER = {
  fullName: 'Jonathan Adrian',
  email: 'jonathan.adrian@gmail.com',
  color: 'bg-sky-100',
};

export default function DashboardUserMenu({ showDetails = true }: Props) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Avatar */}
      <div
        aria-hidden
        className={cn('shrink-0 rounded-full', showDetails ? 'size-13' : 'size-10', USER.color)}
      />

      {/* Info */}
      {showDetails && (
        <div className="flex min-w-0 flex-col">
          <span className="text-ds-text-plain truncate text-sm font-bold">{USER.fullName}</span>
          <span className="text-ds-text-soft truncate text-xs font-semibold">{USER.email}</span>
        </div>
      )}
    </div>
  );
}
