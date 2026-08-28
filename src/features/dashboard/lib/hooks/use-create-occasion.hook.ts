'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';
import { useUploadImage } from '@/shared/hooks/use-upload-image.hook';
import { createOccasion } from '../actions/occasions.actions';

import type { IOccasionFormInput } from '../types/occasion';

export function useCreateOccasion() {
  // Translation
  const t = useTranslations('dashboard.occasions.form');
  const tCommon = useTranslations('common');

  // Navigation
  const router = useRouter();

  // Upload
  const { uploadImage, isUploading } = useUploadImage();

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ title, description, image }: IOccasionFormInput) =>
      createOccasion({
        title,
        ...(description ? { description } : {}),
        ...(image ? { image: await uploadImage(image) } : {}),
      }),
    onSuccess: () => {
      toast.success(t('createSuccess'));
      router.push('/occasions');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : tCommon('error.networkError'));
    },
  });

  return { createOccasion: mutate, isSubmitting: isUploading || isPending };
}
