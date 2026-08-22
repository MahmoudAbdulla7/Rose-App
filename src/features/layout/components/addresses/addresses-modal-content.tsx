import { useTranslations } from 'next-intl';

import type { Address } from '../../lib/types/address';
import AddressesSkeleton from '../../skeletons/addresses.skeleton';
import AddressesList from './addresses-list';

interface AddressesModalContentProps {
  addresses: Address[];
  isLoading: boolean;
  isError: boolean;
  addressToDelete: Address | null;
  setAddressToDelete: React.Dispatch<React.SetStateAction<Address | null>>;
  onEdit: (address: Address) => void;
}

export default function AddressesModalContent({
  addresses,
  isLoading,
  isError,
  addressToDelete,
  setAddressToDelete,
  onEdit,
}: AddressesModalContentProps) {
  const t = useTranslations('address');

  if (isLoading) {
    return <AddressesSkeleton count={3} />;
  }

  if (isError) {
    return <div className="text-destructive py-8 text-center">{t('list.loadError')}</div>;
  }

  if (addresses.length === 0) {
    return <div className="py-8 text-center">{t('list.empty')}</div>;
  }

  return (
    <AddressesList
      addresses={addresses}
      addressToDelete={addressToDelete}
      setAddressToDelete={setAddressToDelete}
      onEdit={onEdit}
    />
  );
}
