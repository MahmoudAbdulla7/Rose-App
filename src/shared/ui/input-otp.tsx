'use client';

import { OTPInput, OTPInputContext, REGEXP_ONLY_DIGITS } from 'input-otp';
import * as React from 'react';
import { cn } from 'shared/lib/utils';

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        // Layout
        'flex items-center',
        // Disabled State
        'has-disabled:opacity-50',
        containerClassName,
      )}
      spellCheck={false}
      inputMode="numeric"
      pattern={REGEXP_ONLY_DIGITS}
      className={cn(
        // Disabled State
        'disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  );
}

const InputOTPGroup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  function InputOTPGroup({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="input-otp-group"
        className={cn(
          // Layout
          'flex items-center gap-2',
          className,
        )}
        {...props}
      />
    );
  },
);

InputOTPGroup.displayName = 'InputOTPGroup';

const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { index: number }
>(function InputOTPSlot({ index, className, ...props }, ref) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      ref={ref}
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        // Size & Layout
        'h-input relative flex w-(--height-input) items-center justify-center',
        // Surface
        'bg-ds-plain',
        // Shape
        'rounded-lg',
        // Border
        'border-ds-border-soft border',
        // Typography
        'text-ds-text-muted text-base font-normal',
        // Transition
        'transition-colors outline-none',
        // Hover State
        'hover:border-ds-border-default',
        // Active State
        'data-[active=true]:border-ds-primary',
        'data-[active=true]:ring',
        'data-[active=true]:ring-ds-ring',
        'data-[active=true]:text-ds-text-plain',
        // Error State
        'aria-invalid:border-ds-danger',
        'aria-invalid:data-[active=true]:ring-ds-ring-danger',
        // Disabled State
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="bg-ds-primary animate-caret-blink h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
});

InputOTPSlot.displayName = 'InputOTPSlot';

export { InputOTP, InputOTPGroup, InputOTPSlot };
