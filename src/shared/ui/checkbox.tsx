'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { CheckIcon } from 'lucide-react';
import { cn } from 'shared/lib/utils';

type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  error?: boolean;
};

function Checkbox({ className, error, disabled, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        `peer aria-invalid:border-ds-danger aria-invalid:ring-ds-ring aria-invalid:aria-checked:border-ds-danger`,

        `data-checked:text-primary-foreground focus-visible:border-ds-primary focus-visible:ring-ds-ring`,
        `data-checked:border-ds-primary data-checked:bg-ds-primary focus-visible:ring`,

        `border-ds-primary relative flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm`,
        `border transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2`,

        `group-has-disabled/field:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring`,

        error && `border-ds-danger focus-visible:border-ds-danger focus-visible:ring-ds-ring`,
        disabled && 'cursor-not-allowed',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
