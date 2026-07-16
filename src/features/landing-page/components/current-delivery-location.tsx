'use client';

import { LocationEdit } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { getCurrentAddressAction } from '@/features/user/lib/actions/get-current-address.action';

export default function CurrentDeliveryLocation() {
  const tDelivery = useTranslations('header.delivery');

  const { data: city, isError } = useQuery({
    queryKey: ['current-address'],
    queryFn: getCurrentAddressAction,
    select: (addresses) => addresses[0]?.city,
  });

  return (
    <div className="flex flex-col">
      <span className="text-sm text-zinc-500">{tDelivery('deliverTo')}</span>

      <div className="text-ds-primary-saturated flex items-center gap-1.5">
        <LocationEdit size={20} strokeWidth={1.5} />
        <span className="font-medium">{isError ? '' : city}</span>
      </div>
    </div>
  );
}
