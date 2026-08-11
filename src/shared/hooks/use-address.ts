import { useQuery } from '@tanstack/react-query';

interface UseCurrentAddressOptions {
  enabled?: boolean;
}

export function useAddress({ enabled = true }: UseCurrentAddressOptions = {}) {
  return useQuery({
    queryKey: ['current-address'],

    queryFn: async () => {
      const response = await fetch('/api/addresses');

      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }

      return response.json();
    },

    enabled,

    select: (addresses) => addresses[0]?.city,
  });
}
