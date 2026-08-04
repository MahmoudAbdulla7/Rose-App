'use client';

import { LocationEdit } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useAuth } from '@/shared/hooks';
import { useAddresses } from '@/features/layout/hooks/use-addresses';

export default function CurrentDeliveryLocation() {
  // Translation
  const tDelivery = useTranslations('header.delivery');

  // Custom hooks
  const { user, isAuthenticated, isLoading } = useAuth();
  const { data: addresses, isError } = useAddresses({ enabled: isAuthenticated });

  // Variables
  const city = addresses?.[0]?.city;

  if (isLoading) {
    return <div className="bg-ds-muted h-8 w-24 animate-pulse rounded-lg" />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <button type="button" className="flex cursor-pointer flex-col px-2.5 text-start">
      <span className="text-ds-text-soft text-sm">{tDelivery('deliverTo')}:</span>

      <div className="text-ds-primary-saturated flex items-center gap-1.5">
        <LocationEdit size={20} strokeWidth={1.5} />
        <span className="font-medium">{isError ? '' : city}</span>
      </div>
    </button>
  );
}
