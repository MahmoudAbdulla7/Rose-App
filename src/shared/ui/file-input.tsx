'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { FieldLabel } from '@/shared/ui/field-label';
import { Trash2, Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { cn } from 'shared/lib/utils';

interface FileInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
  maxSize?: number;
  value?: File | null;
  onChange?: (file: File | null) => void;
  wrapperClassName?: string;
}

function FileInput({
  label,
  error,
  required,
  disabled,
  accept,
  maxSize,
  value,
  onChange,
  wrapperClassName,
}: FileInputProps) {
  const t = useTranslations('common.input');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const id = React.useId();
  const [previewOpen, setPreviewOpen] = React.useState(false);

  const isImage = Boolean(value?.type.startsWith('image/'));

  const previewUrl = React.useMemo(() => {
    if (!value || !isImage) return null;
    return URL.createObjectURL(value);
  }, [value, isImage]);

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && maxSize && file.size > maxSize) return;
    onChange?.(file);
    e.target.value = '';
  };

  const handleDelete = () => {
    onChange?.(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setPreviewOpen(false);
  };

  return (
    <div className={cn('flex w-full flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <FieldLabel htmlFor={id} required={required} error={error} disabled={disabled}>
          {label}
        </FieldLabel>
      )}

      <div
        tabIndex={-1}
        className={cn(
          // Size & Layout
          'h-input flex w-full items-center',
          // Surface
          'bg-ds-plain',
          // Shape
          'rounded-lg',
          // Border
          'border-ds-border-soft border',
          // Hover State
          'hover:border-ds-border-default',
          // Focus State
          'focus-within:border-ds-primary',
          'focus-within:ring',
          'focus-within:ring-ds-ring',
          // Error State
          error && 'border-ds-danger focus-within:ring-ds-ring-danger',

          // Disabled State
          disabled && 'bg-ds-muted pointer-events-none opacity-50',
        )}
      >
        {value ? (
          <div className="flex w-full items-center justify-between gap-2 px-4">
            <div className="flex min-w-0 items-center gap-2">
              {isImage && (
                <>
                  <button
                    type="button"
                    onClick={() => setPreviewOpen(true)}
                    disabled={disabled}
                    className="text-ds-info flex items-center gap-1 text-sm font-normal transition-colors"
                  >
                    <span>{t('reviewCurrentImages')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={disabled}
                    aria-label={t('removeFile')}
                    className="text-ds-default shrink-0 transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </>
              )}
              {!isImage && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={disabled}
                  aria-label={t('removeFile')}
                  className="text-ds-text-muted hover:text-ds-danger shrink-0 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleClick}
              disabled={disabled}
              className="text-ds-primary hover:text-ds-primary flex shrink-0 items-center gap-1 text-sm font-normal transition-colors"
            >
              <Upload className="size-4" />
              <span>{t('uploadFile')}</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            className="text-ds-primary flex h-full w-full items-center justify-start gap-1 ps-4 text-sm font-normal transition-colors"
          >
            <Upload className="size-4" />
            <span>{t('uploadFile')}</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
        required={required && !value}
      />

      {error && <p className="text-ds-danger text-xs">{error}</p>}

      {isImage && value && previewUrl && (
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="gap-4 sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{value.name}</DialogTitle>
            </DialogHeader>
            <div className="bg-ds-muted flex max-h-[70vh] items-center justify-center overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt={t('imagePreview')}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export { FileInput };
export type { FileInputProps };
