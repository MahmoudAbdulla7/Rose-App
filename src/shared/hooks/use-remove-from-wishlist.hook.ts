'use client';

import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

import { removeFromWishlist } from '@/shared/lib/actions/wishlist.actions';
import { WISHLIST_OPTIONS } from '@/shared/lib/apis/wishlist/wishlist.options';
import type {
  AddToWishlistResponse,
  IRemoveFromWishlist,
  IWishlistItem,
  IWishlistResponse,
} from '@/shared/lib/types/wishlist';

type WishlistMutationContext = {
  previousWishlist: IWishlistResponse | undefined;
};

type UseRemoveFromWishlistOptions = Omit<
  UseMutationOptions<AddToWishlistResponse, Error, IRemoveFromWishlist, WishlistMutationContext>,
  'mutationFn' | 'mutationKey'
>;

export function useRemoveFromWishlist(options?: UseRemoveFromWishlistOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: WISHLIST_OPTIONS.REMOVE_MUTATION_KEY,
    mutationFn: async (data: IRemoveFromWishlist) => {
      const response = await removeFromWishlist(data);

      if (!response.status) {
        throw new Error(response.message || 'Failed to remove from wishlist');
      }

      return response;
    },
    onMutate: async (variables, mutation) => {
      await queryClient.cancelQueries({ queryKey: WISHLIST_OPTIONS.QUERY_KEY });

      const previousWishlist = queryClient.getQueryData<IWishlistResponse>(
        WISHLIST_OPTIONS.QUERY_KEY,
      );

      queryClient.setQueryData<IWishlistResponse>(
        WISHLIST_OPTIONS.QUERY_KEY,
        (current: IWishlistResponse | undefined) => {
          if (!current || !current.status) return current;

          return {
            ...current,
            payload: {
              ...current.payload,
              wishlistItems: current.payload.wishlistItems.filter(
                (item: IWishlistItem) => item.productId !== variables.productId,
              ),
            },
          };
        },
      );

      await options?.onMutate?.(variables, mutation);

      return { previousWishlist };
    },
    onError: (error, variables, context, mutation) => {
      if (context?.previousWishlist !== undefined) {
        queryClient.setQueryData(WISHLIST_OPTIONS.QUERY_KEY, context.previousWishlist);
      }
      options?.onError?.(error, variables, context, mutation);
    },
    onSuccess: (data, variables, context, mutation) => {
      options?.onSuccess?.(data, variables, context, mutation);
    },
  });
}
