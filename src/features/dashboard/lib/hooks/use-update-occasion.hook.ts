'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';
import { updateOccasion } from '../actions/occasions.actions';
import type { IUpdateOccasionInput } from '@/shared/lib/types/occasions';

export function useUpdateOccasion(occasionId: string) {
  // Translation
  const t = useTranslations('dashboard.occasions.form');
  const tCommon = useTranslations('common');

  // Navigation
  const router = useRouter();

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (changes: IUpdateOccasionInput) => updateOccasion(occasionId, changes),
    onSuccess: () => {
      toast.success(t('updateSuccess'));
      router.push('/occasions');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : tCommon('error.networkError'));
    },
  });

  return { updateOccasion: mutate, isSubmitting: isPending };
}
