'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';
import { useUploadImage } from '@/shared/hooks/use-upload-image.hook';
import { createCategory } from '../actions/categories.actions';

import type { ICategoryFormInput } from '../types/category';

export function useCreateCategory() {
  // Translation
  const t = useTranslations('dashboard.categories.form');
  const tCommon = useTranslations('common');

  // Navigation
  const router = useRouter();

  // Upload
  const { uploadImage, isUploading } = useUploadImage();

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ title, description, image }: ICategoryFormInput) =>
      createCategory({
        title,
        ...(description ? { description } : {}),
        ...(image ? { image: await uploadImage(image) } : {}),
      }),
    onSuccess: () => {
      toast.success(t('createSuccess'));
      router.push('/categories');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : tCommon('error.networkError'));
    },
  });

  return { createCategory: mutate, isSubmitting: isUploading || isPending };
}
