import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { addToWishlist as serverAdd } from '@/shared/lib/actions/wishlist.actions';
import { guestWishlist } from '@/shared/lib/services/guest-wishlist.service';
import { WISHLIST_OPTIONS } from '@/shared/lib/apis/wishlist/wishlist.options';
import type {
  AddToWishlistResponse,
  IAddToWishlist,
  IWishlistItem,
} from '@/shared/lib/types/wishlist';
import type { IProduct } from '@/shared/lib/types/product';

type AddToWishlistVariables = IAddToWishlist & { product?: IProduct };

export function useAddToWishlist() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      product,
    }: AddToWishlistVariables): Promise<AddToWishlistResponse> => {
      if (isAuthenticated) {
        return await serverAdd({ productId });
      } else {
        if (!product) throw new Error('Product data required for guest wishlist');
        await guestWishlist.add(productId, product);
        const guestItem: IWishlistItem = {
          id: `guest-${Date.now()}-${productId}`,
          createdAt: new Date(),
          userId: 'guest',
          productId,
          product,
        };
        return {
          status: true,
          code: 200,
          message: 'Added locally',
          payload: guestItem,
        };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_OPTIONS.QUERY_KEY });
    },
  });
}
