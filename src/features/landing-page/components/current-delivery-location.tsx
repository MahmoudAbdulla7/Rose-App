'use client';

import { useQuery } from '@tanstack/react-query';
import { LocationEdit } from 'lucide-react';

import { getCurrentAddressAction } from '@/features/user/lib/actions/get-current-address.action';

export default function CurrentDeliveryLocation() {
  const { data: city, isError } = useQuery({
    queryKey: ['user-addresses'],
    queryFn: getCurrentAddressAction,
    select: (addresses) => addresses[0]?.city,
  });

  return (
    <div className="flex flex-col">
      <span className="text-sm text-zinc-500">Deliver to:</span>

      <div className="text-ds-primary-saturated flex items-center gap-1.5">
        <LocationEdit size={20} strokeWidth={1.5} />
        <span className="font-medium">{!isError && city}</span>
      </div>
    </div>
  );
}
