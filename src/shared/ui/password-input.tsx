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

type PasswordInputProps = Omit<InputProps, 'type' | 'leftIcon' | 'rightIcon'> & {
  /** Larger eye icon / end padding for spacious layouts (e.g. hover popup). */
  controlSize?: 'default' | 'lg';
};

function PasswordInput({
  controlSize = 'default',
  className,
  rightIconWrapperClassName,
  ...props
}: PasswordInputProps) {
  const t = useTranslations('common');
  const [visible, setVisible] = React.useState(false);
  const isLarge = controlSize === 'lg';

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
            <Eye className={cn(isLarge ? 'size-7' : 'size-5')} />
          ) : (
            <EyeOff className={cn(isLarge ? 'size-7' : 'size-5')} />
          )}
        </button>
      }
      rightIconWrapperClassName={cn(isLarge && 'end-5', rightIconWrapperClassName)}
      className={cn(isLarge && 'pe-14', className)}
      {...props}
    />
  );
}

export { PasswordInput };
