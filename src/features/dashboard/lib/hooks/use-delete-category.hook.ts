'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { deleteCategory } from '../actions/categories.actions';

export function useDeleteCategory(categoryId: string) {
  // Translation
  const t = useTranslations('dashboard.categories.form');
  const tCommon = useTranslations('common');

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteCategory(categoryId),
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : tCommon('error.networkError'));
    },
  });

  return { deleteCategory: mutate, isDeleting: isPending };
}
