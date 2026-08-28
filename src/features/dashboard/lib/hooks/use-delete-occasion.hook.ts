'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { deleteOccasion } from '../actions/occasions.actions';

export function useDeleteOccasion(occasionId: string) {
  // Translation
  const t = useTranslations('dashboard.occasions.form');
  const tCommon = useTranslations('common');

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteOccasion(occasionId),
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : tCommon('error.networkError'));
    },
  });

  return { deleteOccasion: mutate, isDeleting: isPending };
}
