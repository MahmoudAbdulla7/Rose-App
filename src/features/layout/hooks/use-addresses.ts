import { useQuery } from '@tanstack/react-query';

import type { Address } from '../lib/types/address';

interface UseCurrentAddressOptions {
  enabled?: boolean;
}

export function useAddresses({ enabled = true }: UseCurrentAddressOptions = {}) {
  return useQuery<Address[]>({
    queryKey: ['addresses'],

    queryFn: async () => {
      const response = await fetch('/api/addresses');

      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }

      return response.json();
    },

    enabled,
  });
}
