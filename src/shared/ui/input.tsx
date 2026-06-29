import * as React from 'react';
import { FieldLabel } from '@/shared/ui/field-label';
import { cn } from 'shared/lib/utils';

const inputShellClassName = cn(
  // Size & Layout
  'w-full min-w-0 h-input',

  // Surface
  'bg-ds-plain',

  // Shape
  'rounded-lg',

  // Border
  'border border-ds-border-soft',

  // Typography
  'text-sm text-ds-text-plain',

  // Hover State
  'hover:border-ds-border-default',

  // Focus State
  'focus-visible:border-ds-primary',
  'focus-visible:ring',
  'focus-visible:ring-ds-ring',

  // Error State
  'aria-invalid:border-ds-danger',
  'aria-invalid:focus-visible:ring-ds-ring-danger',

  // Disabled State
  'disabled:bg-ds-muted',
  'disabled:pointer-events-none',
  'disabled:cursor-not-allowed',
  'disabled:text-ds-text-muted',
);
interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

function Input({
  className,
  type,
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  wrapperClassName,
  id,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn('flex w-full flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <FieldLabel
          htmlFor={inputId}
          required={props.required}
          error={error}
          disabled={props.disabled}
        >
          {label}
        </FieldLabel>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="text-ds-text-muted absolute start-2 flex items-center">{leftIcon}</span>
        )}

        <input
          id={inputId}
          min={type === 'number' ? 0 : undefined}
          step={type === 'number' ? 1 : undefined}
          type={type}
          aria-invalid={!!error}
          className={cn(
            inputShellClassName,

            '[&::-webkit-inner-spin-button]:opacity-100',
            '[&::-webkit-outer-spin-button]:opacity-100',
            // Internal Spacing
            'gap-2 px-4 py-4',

            // Focus Ring Enhancement
            'focus-visible:ring-2',
            'focus-visible:ring-ds-ring',
            'focus-visible:outline-none',

            // Placeholder
            'placeholder:text-ds-text-muted',

            // Disabled
            'disabled:text-ds-text-muted',

            // Icon Offsets
            leftIcon && !rightIcon && 'ps-10',
            rightIcon && !leftIcon && 'pe-8',
            leftIcon && rightIcon && 'ps-10 pe-8',
            className,
          )}
          {...props}
        />

        {rightIcon && (
          <span className="text-ds-text-muted absolute end-3 flex items-center">{rightIcon}</span>
        )}
      </div>

      {error && (
        <p id={`${inputId}-error`} className="text-ds-danger text-xs">
          {error}
        </p>
      )}

      {!error && hint && (
        <p id={`${inputId}-hint`} className="text-ds-text-soft text-xs">
          {hint}
        </p>
      )}
    </div>
  );
}

export { Input, inputShellClassName };
export type { InputProps };
