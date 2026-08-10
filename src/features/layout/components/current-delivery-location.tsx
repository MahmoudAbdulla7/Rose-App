'use client';

import { LocationEdit } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useAuth } from '@/shared/hooks';
import { useAddress } from '@/shared/hooks/use-address';

export default function CurrentDeliveryLocation() {
  // Translation
  const tDelivery = useTranslations('header.delivery');

  // Custom hooks
  const { user, isAuthenticated, isLoading } = useAuth();
  const { data: city, isError } = useAddress({ enabled: isAuthenticated });

  if (isLoading) {
    return <div className="bg-ds-muted h-8 w-24 animate-pulse rounded-lg" />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex flex-col px-2.5">
      <span className="text-sm text-zinc-500">{tDelivery('deliverTo')}:</span>

      <div className="text-ds-primary-saturated flex items-center gap-1.5">
        <LocationEdit size={20} strokeWidth={1.5} />
        <span className="font-medium">{isError ? '' : city}</span>
      </div>
    </div>
  );
}
