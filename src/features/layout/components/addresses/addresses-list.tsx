import { MapPin, PenLine, Phone, Trash2 } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import type { Address } from '../../lib/types/address';

interface AddressesListProps {
  addresses: Address[];
}

export default function AddressesList({ addresses }: AddressesListProps) {
  return (
    <div className="flex flex-col gap-6">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="border-ds-border-soft hover:border-ds-secondary relative mt-5 rounded-lg border p-4 pe-8 pt-6"
        >
          <div className="text-ds-primary bg-background absolute inset-s-3 -top-5 px-1.5 text-2xl font-semibold">
            {address.title}
          </div>

          <div className="bg-background absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 p-1">
            <div className="flex flex-col gap-2">
              <Button variant="soft" size="icon-rounded">
                <PenLine />
              </Button>

              <Button variant="destructive" size="icon-rounded">
                <Trash2 />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-ds-success flex h-8 w-8 items-center justify-center rounded-full">
                  <MapPin strokeWidth={1.5} size={20} color="white" />
                </div>
                <p className="text-ds-text-plain text-2xl font-semibold">{address.city}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={20} className="text-ds-text-default" />
                <p className="text-ds-text-default text-lg">{address.phone}</p>
              </div>
            </div>
            <Badge variant="muted" className="text-base">
              {address.street}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
