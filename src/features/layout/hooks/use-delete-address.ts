import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteAddressAction } from '../lib/actions/addresses.action';

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-address'],

    mutationFn: deleteAddressAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['addresses'],
      });
    },

    onError: (error) => toast.error(error.message),
  });
}
