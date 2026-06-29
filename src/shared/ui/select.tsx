'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Select as SelectPrimitive } from '@base-ui/react/select';

import { cn } from 'shared/lib/utils';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn('scroll-my-1', className)}
      {...props}
    />
  );
}

function SelectValue({ className, placeholder, ...props }: SelectPrimitive.Value.Props) {
  const t = useTranslations('common.select');
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      placeholder={placeholder ?? t('placeholder')}
      className={cn(
        // Layout
        'flex flex-1 text-start',

        // Typography — selected value
        'font-inter text-ds-text-plain',

        // Placeholder State
        'group-data-placeholder/select-trigger:text-ds-text-muted',

        // Disabled State
        'group-disabled/select-trigger:text-ds-text-muted',
        className,
      )}
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: 'sm' | 'default';
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        // Group & Layout
        'group/select-trigger flex w-fit items-center justify-between gap-1.5 px-4',

        // Border & Background
        'border-ds-border-soft bg-ds-plain rounded-lg border',

        // Typography
        'text-ds-text-plain text-sm whitespace-nowrap',

        // Transitions & Behavior
        'transition-colors outline-none select-none',

        // Size Variants
        'data-[size=default]:h-12.25 data-[size=sm]:h-9 data-[size=sm]:rounded-[min(var(--radius-md),10px)]',

        // Hover State
        'hover:border-ds-border-default',

        // Focus State
        'focus:border-ds-primary focus:ring-ds-ring focus:ring',

        // Validation States
        'aria-invalid:border-ds-danger aria-invalid:ring-ds-ring-danger aria-invalid:ring',

        // Disabled State
        'disabled:bg-ds-muted disabled:[&_svg]:text-ds-text-muted disabled:cursor-not-allowed',

        // Value Slot
        '*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5',

        // Icons
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="text-ds-text-muted pointer-events-none size-4 transition-transform duration-200 group-data-popup-open/select-trigger:rotate-180" />
        }
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            // Layout & Positioning
            'relative isolate z-50 origin-(--transform-origin)',

            // Sizing nd
            'max-h-[min(--spacing(65),var(--available-height))] w-(--anchor-width) min-w-36',

            // Overflow
            'no-scrollbar overflow-x-hidden overflow-y-auto',

            // Border & Background
            'border-ds-border-soft bg-ds-plain text-ds-text-plain shadow-ds-subtle rounded-lg border',

            // Animation Timing
            'duration-100',

            // Slide-in Direction
            'data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-start-2 data-[side=inline-start]:slide-in-from-end-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',

            // Open / Closed Animation
            'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[align-trigger=true]:animate-none',
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn('text-ds-text-muted px-1.5 py-1 text-xs', className)}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // Layout & Sizing
        'relative flex w-full items-center p-4',

        // Typography
        'text-ds-text-plain in-data-selected:text-ds-primary text-sm',

        // Behavior
        'cursor-default outline-hidden select-none',

        // Highlighted State
        'data-highlighted:bg-ds-muted',

        // Selected State
        'data-selected:bg-ds-muted data-selected:font-medium',

        // Disabled State
        'data-disabled:bg-ds-muted data-disabled:pointer-events-none',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "bg-ds-plain top-0 z-10 flex w-full cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bg-ds-plain bottom-0 z-10 flex w-full cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
