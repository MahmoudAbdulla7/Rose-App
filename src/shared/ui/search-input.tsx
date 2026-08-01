'use client';

import { Input, type InputProps } from '@/shared/ui/input';
import { cn } from '@/shared/lib/utils';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

type SearchInputProps = Omit<InputProps, 'type' | 'leftIcon' | 'rightIcon'> & {
  onClear?: () => void;
};

function SearchInput({
  onChange,
  onClear,
  value,
  defaultValue,
  wrapperClassName,
  ...props
}: SearchInputProps) {
  const t = useTranslations('common.input');
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(
    String(defaultValue ?? ''),
  );

  const searchValue = isControlled ? String(value ?? '') : uncontrolledValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) {
      setUncontrolledValue('');
    }
    onClear?.();

    if (onChange) {
      const event = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <Input
      type="text"
      placeholder={t('searchPlaceholder')}
      value={searchValue}
      onChange={handleChange}
      leftIcon={<Search className="w-icon-md h-icon-md text-ds-text-muted" />}
      rightIcon={
        searchValue ? (
          <button
            type="button"
            onClick={handleClear}
            className="text-ds-text-muted hover:text-ds-text-default transition-colors"
            aria-label={t('clearSearch')}
          >
            <X className="size-4" />
          </button>
        ) : undefined
      }
      wrapperClassName={cn('w-full', wrapperClassName)}
      {...props}
    />
  );
}

export { SearchInput };
