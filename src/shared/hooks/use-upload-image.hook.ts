'use client';

import { useMutation } from '@tanstack/react-query';

import { uploadImage } from '@/shared/lib/actions/upload-image.action';

export function useUploadImage() {
  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);

      return uploadImage(formData);
    },
  });

  return { uploadImage: mutation.mutateAsync, isUploading: mutation.isPending };
}
