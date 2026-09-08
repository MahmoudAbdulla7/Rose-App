'use client';

import { Input, type InputProps } from '@/shared/ui/input';
import { cn } from '@/shared/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

const toggleButtonClassName = cn(
  // Typography
  'text-ds-text-muted',

  // Hover State
  'hover:cursor-pointer',
  'hover:text-ds-text-default',

  // Disabled State
  'disabled:pointer-events-none',
  'disabled:cursor-not-allowed',
  'disabled:opacity-50',
);

const toggleIconClassName = cn(
  // Size
  'size-5',
);

function PasswordInput({ ...props }: Omit<InputProps, 'type' | 'leftIcon' | 'rightIcon'>) {
  const t = useTranslations('common');
  const [visible, setVisible] = React.useState(false);

  return (
    <Input
      type={visible ? 'text' : 'password'}
      rightIcon={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className={toggleButtonClassName}
          aria-label={visible ? t('input.hidePassword') : t('input.showPassword')}
          disabled={props.disabled}
        >
          {visible ? (
            <Eye className={toggleIconClassName} />
          ) : (
            <EyeOff className={toggleIconClassName} />
          )}
        </button>
      }
      {...props}
    />
  );
}

export { PasswordInput };
