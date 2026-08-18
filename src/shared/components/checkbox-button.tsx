'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';

import { cn } from '@/shared/lib/utils';

type CheckboxButtonProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

function CheckboxButton({ className, disabled, children, ...props }: CheckboxButtonProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox-button"
      disabled={disabled}
      className={cn(
        'group/checkbox-button border-ds-border-soft flex h-full w-full cursor-pointer flex-col items-center gap-2.5 rounded-2xl border bg-transparent p-4 text-center transition-colors outline-none',
        'not-data-disabled:hover:bg-ds-subtle/70',
        'data-checked:bg-ds-subtle',
        'focus-visible:ring-ds-ring focus-visible:ring focus-visible:ring-offset-2',
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </CheckboxPrimitive.Root>
  );
}

export { CheckboxButton };
export type { CheckboxButtonProps };
