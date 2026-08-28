'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { FieldError } from '@/shared/ui/field';
import { FieldLabel } from '@/shared/ui/field-label';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';

import { useUpdateOccasion } from '../../lib/hooks/use-update-occasion.hook';
import { createOccasionSchema } from '../../lib/schemas/occasion.schema';
import type { IOccasionFormInput } from '../../lib/types/occasion';

type Props = {
  submitLabel: string;
  occasionId: string;
  defaultName?: string;
  defaultDescription?: string;
  imageUrl?: string;
};

export default function UpdateOccasionForm({
  submitLabel,
  occasionId,
  defaultName,
  defaultDescription,
  imageUrl,
}: Props) {
  // Translation
  const t = useTranslations('dashboard.occasions.form');
  const tValidation = useTranslations('dashboard.occasions.validation');

  // State
  const [previewOpen, setPreviewOpen] = useState(false);

  // Mutation
  const { updateOccasion, isSubmitting } = useUpdateOccasion(occasionId);

  // Form
  const {
    handleSubmit,
    register,
    formState: { dirtyFields, errors },
  } = useForm<IOccasionFormInput>({
    resolver: zodResolver(createOccasionSchema(tValidation)),
    defaultValues: { title: defaultName ?? '', description: defaultDescription ?? '' },
  });

  const submitChanges = handleSubmit(({ title, description }) => {
    if (!dirtyFields.title && !dirtyFields.description) {
      toast.info(t('noChanges'));
      return;
    }

    updateOccasion({ title, ...(dirtyFields.description ? { description } : {}) });
  });

  return (
    <form
      onSubmit={submitChanges}
      noValidate
      className="bg-ds-plain flex flex-1 flex-col justify-between gap-8 rounded-4xl p-6 lg:flex-none lg:gap-32"
    >
      <div className="flex w-full max-w-3xl flex-col gap-4.5">
        <Input
          label={t('name')}
          placeholder={t('namePlaceholder')}
          error={errors.title?.message}
          disabled={isSubmitting}
          required
          {...register('title')}
        />

        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="occasion-description" error={errors.description?.message}>
            {t('description')}
          </FieldLabel>

          <Textarea
            id="occasion-description"
            placeholder={t('descriptionPlaceholder')}
            aria-invalid={!!errors.description}
            disabled={isSubmitting}
            {...register('description')}
          />

          <FieldError errors={[errors.description]} className="text-xs" />
        </div>

        {imageUrl && (
          <Button
            type="button"
            variant="subtle"
            size="lg"
            className="text-ds-info self-start"
            leftIcon={<ImageIcon className="size-4.5" />}
            onClick={() => setPreviewOpen(true)}
          >
            {t('viewImage')}
          </Button>
        )}
      </div>

      <Button type="submit" size="xl" className="w-full max-w-3xl" loading={isSubmitting}>
        {submitLabel}
      </Button>

      {imageUrl && (
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="gap-4 sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{t('viewImage')}</DialogTitle>
            </DialogHeader>

            <div className="bg-ds-muted relative aspect-video overflow-hidden rounded-lg">
              <Image src={imageUrl} alt={t('image')} fill className="object-contain" />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </form>
  );
}
