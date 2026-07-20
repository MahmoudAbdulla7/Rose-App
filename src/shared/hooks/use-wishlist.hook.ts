'use client';

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { fetchWishlistItems } from '@/shared/lib/apis/wishlist/user-wishlist-items.api';
import { WISHLIST_OPTIONS } from '@/shared/lib/apis/wishlist/wishlist.options';
import type { IWishlistResponse } from '@/shared/lib/types/wishlist';

type useWishlistOptions = Omit<
  UseQueryOptions<IWishlistResponse, Error, IWishlistResponse, typeof WISHLIST_OPTIONS.QUERY_KEY>,
  'queryKey' | 'queryFn'
>;

export function useWishlist(options?: useWishlistOptions) {
  return useQuery({
    queryKey: WISHLIST_OPTIONS.QUERY_KEY,
    queryFn: fetchWishlistItems,
    ...options,
  });
}
