'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createReviewAction } from '../lib/actions/create-review';
import type { Review, ReviewInput } from '../lib/types/review';

export const reviewsQueryKey = (productId: string) => ['reviews', productId] as const;

export function useCreateReview(productId: string) {
  const queryClient = useQueryClient();

  return useMutation<Review, Error, Omit<ReviewInput, 'productId'>>({
    mutationFn: (input) => createReviewAction({ ...input, productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewsQueryKey(productId),
      });
    },
  });
}
