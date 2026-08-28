'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';
import { updateCategory } from '../actions/categories.actions';
import type { IUpdateCategoryInput } from '@/shared/lib/types/categories';

export function useUpdateCategory(categoryId: string) {
  // Translation
  const t = useTranslations('dashboard.categories.form');
  const tCommon = useTranslations('common');

  // Navigation
  const router = useRouter();

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (changes: IUpdateCategoryInput) => updateCategory(categoryId, changes),
    onSuccess: () => {
      toast.success(t('updateSuccess'));
      router.push('/categories');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : tCommon('error.networkError'));
    },
  });

  return { updateCategory: mutate, isSubmitting: isPending };
}
