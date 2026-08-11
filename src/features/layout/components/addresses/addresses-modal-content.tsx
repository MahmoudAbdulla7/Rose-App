import type { Address } from '../../lib/types/address';
import AddressesSkeleton from '../../skeletons/addresses.skeleton';
import AddressesList from './addresses-list';

interface AddressesModalContentProps {
  addresses: Address[];
  isLoading: boolean;
  isError: boolean;
}

export default function AddressesModalContent({
  addresses,
  isLoading,
  isError,
}: AddressesModalContentProps) {
  if (isLoading) {
    return <AddressesSkeleton count={3} />;
  }

  if (isError) {
    return <div className="text-destructive py-8 text-center">Failed to load addresses.</div>;
  }

  if (addresses.length === 0) {
    return <div className="py-8 text-center">No saved addresses.</div>;
  }

  return <AddressesList addresses={addresses} />;
}
