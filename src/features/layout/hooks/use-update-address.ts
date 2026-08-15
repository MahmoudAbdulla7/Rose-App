import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateAddressAction } from '../lib/actions/addresses.action';
import type { AddressPayload } from '../lib/types/address';

interface UpdateAddressVariables {
  id: string;
  payload: AddressPayload;
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-address'],

    mutationFn: ({ id, payload }: UpdateAddressVariables) => updateAddressAction(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['addresses'],
      });
    },

    onError: (error) => toast.error(error.message),
  });
}
