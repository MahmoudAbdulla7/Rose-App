'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import { FieldLabel } from '@/shared/ui/field-label';
import { FileInput } from '@/shared/ui/file-input';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';

import { useCreateCategory } from '../../lib/hooks/use-create-category.hook';
import { createCategorySchema } from '../../lib/schemas/category.schema';
import type { ICategoryFormInput } from '../../lib/types/category';

type Props = {
  submitLabel: string;
};

export default function CreateCategoryForm({ submitLabel }: Props) {
  // Translation
  const t = useTranslations('dashboard.categories.form');
  const tValidation = useTranslations('dashboard.categories.validation');

  // Mutation
  const { createCategory, isSubmitting } = useCreateCategory();

  // Form
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ICategoryFormInput>({
    resolver: zodResolver(createCategorySchema(tValidation)),
    defaultValues: { title: '', description: '' },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => createCategory(values))}
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
          <FieldLabel htmlFor="category-description" error={errors.description?.message}>
            {t('description')}
          </FieldLabel>

          <Textarea
            id="category-description"
            placeholder={t('descriptionPlaceholder')}
            aria-invalid={!!errors.description}
            disabled={isSubmitting}
            {...register('description')}
          />

          {errors.description?.message && (
            <p className="text-ds-danger text-xs">{errors.description.message}</p>
          )}
        </div>

        <Controller
          control={control}
          name="image"
          render={({ field, fieldState }) => (
            <FileInput
              label={t('image')}
              accept="image/*"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
              disabled={isSubmitting}
            />
          )}
        />
      </div>

      <Button type="submit" size="xl" className="w-full max-w-3xl" loading={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}
