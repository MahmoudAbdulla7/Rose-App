'use client';

import { Input, type InputProps } from '@/shared/ui/input';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

function SearchInput({
  onChange,
  value,
  defaultValue,
  placeholder,
  ...props
}: Omit<InputProps, 'type' | 'leftIcon' | 'rightIcon'>) {
  const t = useTranslations('common.Input');
  const [searchValue, setSearchValue] = React.useState<string>(String(defaultValue ?? value ?? ''));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onChange?.(e);
  };

  return (
    <Input
      type="text"
      placeholder={placeholder ?? t('searchPlaceholder')}
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
      {...props}
    />
  );
}

export { SearchInput };
