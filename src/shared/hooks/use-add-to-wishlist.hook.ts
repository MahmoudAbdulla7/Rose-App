'use client';

import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

import { addToWishlist } from '@/shared/lib/actions/wishlist.actions';
import { WISHLIST_OPTIONS } from '@/shared/lib/apis/wishlist/wishlist.options';
import type {
  AddToWishlistResponse,
  IAddToWishlist,
  IWishlistItem,
  IWishlistResponse,
} from '@/shared/lib/types/wishlist';
import { createOptimisticWishlistItem } from '../lib/utils/create-optmistic-wishlist-item.utils';

type WishlistMutationContext = {
  previousWishlist: IWishlistResponse | undefined;
};

type UseAddToWishlistOptions = Omit<
  UseMutationOptions<AddToWishlistResponse, Error, IAddToWishlist, WishlistMutationContext>,
  'mutationFn' | 'mutationKey'
>;

export function useAddToWishlist(options?: UseAddToWishlistOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: WISHLIST_OPTIONS.ADD_MUTATION_KEY,
    mutationFn: async (data: IAddToWishlist) => {
      const response = await addToWishlist(data);

      if (!response.status) {
        throw new Error(response.message || 'Failed to add to wishlist');
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
          const optimisticItem = createOptimisticWishlistItem(variables.productId);

          if (!current || !current.status) {
            return {
              status: true,
              code: 200,
              message: 'ok',
              payload: { wishlistItems: [optimisticItem] },
            };
          }

          const alreadyExists = current.payload.wishlistItems.some(
            (item: IWishlistItem) => item.productId === variables.productId,
          );

          if (alreadyExists) return current;

          return {
            ...current,
            payload: {
              ...current.payload,
              wishlistItems: [...current.payload.wishlistItems, optimisticItem],
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
      if (data.status) {
        queryClient.setQueryData<IWishlistResponse>(
          WISHLIST_OPTIONS.QUERY_KEY,
          (current: IWishlistResponse | undefined) => {
            const serverItem: IWishlistItem = {
              ...data.payload,
              productId: data.payload.productId || variables.productId,
            };

            if (!current || !current.status) {
              return {
                status: true,
                code: data.code,
                message: data.message,
                payload: { wishlistItems: [serverItem] },
              };
            }

            const hasProduct = current.payload.wishlistItems.some(
              (item: IWishlistItem) => item.productId === variables.productId,
            );

            return {
              ...current,
              payload: {
                ...current.payload,
                wishlistItems: hasProduct
                  ? current.payload.wishlistItems.map((item: IWishlistItem) =>
                      item.productId === variables.productId ? serverItem : item,
                    )
                  : [...current.payload.wishlistItems, serverItem],
              },
            };
          },
        );
      }

      options?.onSuccess?.(data, variables, context, mutation);
    },
  });
}
