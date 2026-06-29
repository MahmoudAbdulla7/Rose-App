import * as React from 'react';
import { cn } from '@/shared/lib/utils';

type FieldLabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string | boolean;
  disabled?: boolean;
  className?: string;
};

function FieldLabel({ htmlFor, children, required, error, disabled, className }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'text-ds-text-plain text-sm font-medium',
        error && 'text-ds-danger',
        disabled && 'text-ds-text-muted',
        className,
      )}
    >
      {children}
      {required && (
        <span className="text-ds-danger" aria-hidden="true">
          {' '}
          *
        </span>
      )}
    </label>
  );
}

export { FieldLabel };
