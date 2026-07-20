'use client';

import { Input, type InputProps } from '@/shared/ui/input';
import { cn } from '@/shared/lib/utils';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

function SearchInput({
  onChange,
  value,
  defaultValue,
  wrapperClassName,
  ...props
}: Omit<InputProps, 'type' | 'leftIcon' | 'rightIcon'>) {
  const t = useTranslations('common.input');
  const [searchValue, setSearchValue] = React.useState<string>(String(defaultValue ?? value ?? ''));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onChange?.(e);
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
            onClick={() => setSearchValue('')}
            className="text-ds-text-muted hover:text-ds-text-default transition-colors"
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
