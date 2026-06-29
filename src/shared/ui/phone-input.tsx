'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { FieldLabel } from '@/shared/ui/field-label';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
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

type CountryEntry = { label: string; value: RPNInput.Country | undefined; divider?: boolean };

type CountrySelectProps = {
  disabled?: boolean;
  readOnly?: boolean;
  value: RPNInput.Country | undefined;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country | undefined) => void;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  'aria-label'?: string;
};

const countrySelectTriggerClassName = cn(
  // Country Prefix Section
  'flex shrink-0 items-center gap-2',

  // Surface
  'bg-transparent',

  // Border Divider
  'border-ds-border-soft border-0 border-e',

  // Spacing
  'h-full px-3',

  // Interaction
  'hover:bg-ds-muted/50',

  // Focus
  'focus-visible:outline-none',

  // Disabled State
  'disabled:cursor-not-allowed disabled:opacity-50',
);

const CountrySelect = ({
  disabled,
  readOnly,
  value: selectedCountry,
  options: countryList,
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel = 'Select country',
}: CountrySelectProps) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const selectableCountries = React.useMemo(
    () =>
      countryList.filter(
        (entry): entry is CountryEntry & { value: RPNInput.Country } =>
          Boolean(entry.value) && !entry.divider,
      ),
    [countryList],
  );

  const resolvedCountry =
    selectedCountry ?? selectableCountries[0]?.value ?? ('EG' as RPNInput.Country);
  const selectedEntry = selectableCountries.find((entry) => entry.value === resolvedCountry);
  const countryCodeDisplay = resolvedCountry.toUpperCase();
  const flagTitle = selectedEntry?.label ?? countryCodeDisplay;
  const callingCode = RPNInput.getCountryCallingCode(resolvedCountry);
  const isInteractive = !disabled && !readOnly;

  const filteredCountries = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return selectableCountries;
    }

    return selectableCountries.filter((entry) => {
      const code = entry.value.toUpperCase();
      const entryCallingCode = RPNInput.getCountryCallingCode(entry.value);

      return (
        entry.label.toLowerCase().includes(query) ||
        code.toLowerCase().includes(query) ||
        entryCallingCode.includes(query)
      );
    });
  }, [search, selectableCountries]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setSearch('');
    }
  };

  const handleSelect = (country: RPNInput.Country) => {
    onChange(country);
    setOpen(false);
    setSearch('');
  };

  const triggerContent = (
    <>
      <FlagComponent country={resolvedCountry} countryName={flagTitle} />
      <span className="text-ds-text-plain truncate text-sm font-medium">
        {countryCodeDisplay} (+{callingCode})
      </span>
      <ChevronsUpDown className="text-ds-text-plain size-4 shrink-0" />
    </>
  );

  if (!isInteractive) {
    return (
      <div aria-label={ariaLabel} className={cn(countrySelectTriggerClassName, 'cursor-default')}>
        {triggerContent}
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onFocus={onFocus}
        onBlur={onBlur}
        className={countrySelectTriggerClassName}
      >
        {triggerContent}
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="bottom"
        className="border-ds-border-soft bg-ds-plain text-ds-text-plain w-72 p-0"
      >
        <div className="border-ds-border-soft border-b p-2">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search country..."
            className={cn(
              'border-ds-border-soft bg-ds-plain text-ds-text-plain placeholder:text-ds-text-muted w-full rounded-md border px-3 py-2 text-sm outline-none',
              'focus:border-ds-primary focus:ring-ds-ring focus:ring',
            )}
          />
        </div>

        <ul
          role="listbox"
          aria-label={ariaLabel}
          className="max-h-60 overflow-y-auto overscroll-contain p-1"
        >
          {filteredCountries.length === 0 ? (
            <li className="text-ds-text-muted px-3 py-2 text-center text-sm">No countries found</li>
          ) : (
            filteredCountries.map((entry) => {
              const isSelected = entry.value === resolvedCountry;
              const optionCallingCode = RPNInput.getCountryCallingCode(entry.value);

              return (
                <li key={entry.value} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(entry.value)}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-md px-3 py-2 text-start text-sm',
                      'hover:bg-ds-muted data-selected:bg-ds-muted',
                      isSelected && 'bg-ds-muted font-medium',
                    )}
                  >
                    <FlagComponent country={entry.value} countryName={entry.label} />
                    <span className="min-w-0 flex-1 truncate">{entry.label}</span>
                    <span className="text-ds-text-muted shrink-0">
                      {entry.value.toUpperCase()} (+{optionCallingCode})
                    </span>
                    {isSelected && <Check className="text-ds-primary size-4 shrink-0" />}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </PopoverContent>
    </Popover>
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
