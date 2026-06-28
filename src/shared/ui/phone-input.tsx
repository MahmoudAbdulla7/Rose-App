'use client';

import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { FieldLabel } from '@/shared/ui/field-label';
import { cn } from '@/shared/lib/utils';
import { inputShellClassName } from './input';

const phoneInputFieldClassName = cn(
  // Layout
  'min-w-0 flex-1 h-full',
  // Surface
  'border-0 bg-transparent shadow-none outline-none',
  // Typography
  'px-4 py-4 text-sm text-ds-text-plain',
  // Placeholder
  'placeholder:text-ds-text-muted',
  // Disabled State
  'disabled:cursor-not-allowed',
  'disabled:text-ds-text-muted',
  'disabled:opacity-50',
);

type PhoneInputProps = Omit<React.ComponentProps<typeof RPNInput.default>, 'onChange'> & {
  label?: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
  onChange?: (value: RPNInput.Value) => void;
};

const PhoneInput = React.forwardRef<React.ComponentRef<typeof RPNInput.default>, PhoneInputProps>(
  function PhoneInput(
    {
      className,
      onChange,
      value,
      label,
      error,
      hint,
      wrapperClassName,
      id,
      disabled,
      required,
      defaultCountry = 'EG',
      countries = ['EG'],
      placeholder,
      ...props
    },
    ref,
  ) {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className={cn('flex w-full flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <FieldLabel htmlFor={inputId} required={required} error={error} disabled={disabled}>
            {label}
          </FieldLabel>
        )}

        <div className="relative flex w-full items-center">
          <RPNInput.default
            ref={ref}
            id={inputId}
            defaultCountry={defaultCountry}
            countries={countries}
            disabled={disabled}
            required={required}
            value={value}
            placeholder={placeholder}
            onChange={(nextValue) => onChange?.(nextValue)}
            flagComponent={FlagComponent}
            countrySelectComponent={CountrySelect}
            inputComponent={InputComponent}
            smartCaret={false}
            aria-invalid={!!error}
            className={cn(
              inputShellClassName,
              // Phone Input Layout
              'flex items-stretch overflow-hidden p-0',
              // Focus State
              'focus-within:border-ds-primary',
              'focus-within:ring',
              'focus-within:ring-ds-ring',

              // Error State
              error && 'border-ds-danger focus-within:ring-ds-ring-danger',

              // Disabled State
              disabled && 'bg-ds-muted',

              className,
            )}
            {...props}
          />
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
  },
);

PhoneInput.displayName = 'PhoneInput';

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  function InputComponent({ className, ...props }, ref) {
    return (
      <input ref={ref} type="tel" className={cn(phoneInputFieldClassName, className)} {...props} />
    );
  },
);

InputComponent.displayName = 'InputComponent';

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  readOnly?: boolean;
  value: RPNInput.Country | undefined;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
};

const CountrySelect = ({ value: selectedCountry, options: countryList }: CountrySelectProps) => {
  const resolvedCountry = selectedCountry ?? ('EG' as RPNInput.Country);
  const selectedEntry = countryList.find((entry) => entry.value === resolvedCountry);
  const countryCodeDisplay = resolvedCountry.toUpperCase();
  const flagTitle = selectedEntry?.label ?? countryCodeDisplay;
  const callingCode = RPNInput.getCountryCallingCode(resolvedCountry);

  return (
    <div
      aria-hidden
      className={cn(
        // Country Prefix Section
        'flex shrink-0 items-center gap-2',

        // Surface
        'bg-transparent',

        // Border Divider
        'border-ds-border-soft border-0 border-e',

        // Spacing
        'px-3',

        // Read Only State
        'cursor-not-allowed opacity-50',
      )}
    >
      <FlagComponent country={resolvedCountry} countryName={flagTitle} />
      <span className="text-ds-text-plain truncate text-sm font-medium">
        {countryCodeDisplay} (+{callingCode})
      </span>
      <ChevronsUpDown className="text-ds-text-plain size-4 shrink-0" />
    </div>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="bg-ds-muted relative h-4 w-4 shrink-0 overflow-hidden rounded-full">
      {Flag && (
        <span className="absolute -inset-x-1 inset-y-0 flex items-center justify-center [&>svg]:h-auto [&>svg]:w-full">
          <Flag title={countryName} />
        </span>
      )}
    </span>
  );
};

export { PhoneInput };
export type { PhoneInputProps };
