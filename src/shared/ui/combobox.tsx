'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import { cn } from 'shared/lib/utils';
import { Button } from 'shared/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from 'shared/ui/input-group';
import { ChevronDownIcon, ChevronUpIcon, XIcon } from 'lucide-react';

const Combobox = ComboboxPrimitive.Root;

function ComboboxValue({ placeholder, ...props }: ComboboxPrimitive.Value.Props) {
  const t = useTranslations('common.select');
  return (
    <ComboboxPrimitive.Value
      data-slot="combobox-value"
      placeholder={placeholder ?? t('placeholder')}
      {...props}
    />
  );
}

function ComboboxTrigger({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(
        // Structure
        'group/combobox-trigger',

        // Sizing
        'h-12.25 px-4',

        // Typography & Color
        'placeholder:text-ds-text-muted',

        // SVG sizing
        "[&_svg:not([class*='size-'])]:size-4",

        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="text-ds-text-muted pointer-events-none size-4 group-data-popup-open/combobox-trigger:hidden" />
      <ChevronUpIcon className="text-ds-text-muted pointer-events-none hidden size-4 group-data-popup-open/combobox-trigger:block" />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  );
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  placeholder,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
}) {
  const t = useTranslations('common.select');
  return (
    <InputGroup className={cn('w-auto', className)}>
      <ComboboxPrimitive.Input
        placeholder={placeholder ?? t('search')}
        render={
          <InputGroupInput
            disabled={disabled}
            className="text-ds-text-plain placeholder:text-ds-text-muted"
          />
        }
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
}

function ComboboxContent({
  className,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(
            // Structure
            'group/combobox-content relative origin-(--transform-origin) overflow-hidden',

            // Sizing
            'max-h-(--available-height) w-64 data-[chips=true]:min-w-(--anchor-width)',

            // Borders, Ring & Outline
            'border-ds-border-muted shadow-ds-subtle rounded-lg border',

            // Typography & Color
            'bg-ds-plain text-ds-text-plain',

            // Animation
            'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 duration-100',

            // Slide-in by side
            'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-end-2 data-[side=inline-end]:slide-in-from-start-2',

            // Search field (nested input-group)
            '*:data-[slot=input-group]:m-2.5 *:data-[slot=input-group]:h-auto *:data-[slot=input-group]:has-[[data-slot=input-group-control]:focus-visible]:ring-0',
            '*:data-[slot=input-group]:border-ds-border-muted *:data-[slot=input-group]:bg-ds-plain *:data-[slot=input-group]:rounded-md *:data-[slot=input-group]:shadow-none',

            className,
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        // Structure
        'scroll-py-1 overflow-y-auto overscroll-contain data-empty:p-0',

        // Sizing
        'max-h-[min(calc(--spacing(72)-(--spacing(9))),calc(var(--available-height)-(--spacing(9))))]',

        // Scrollbar
        'no-scrollbar',

        className,
      )}
      {...props}
    />
  );
}

function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        // Structure
        'relative flex w-full cursor-default items-center gap-2 select-none',

        // Sizing
        'p-4',

        // Typography & Color
        'font-inter text-ds-text-plain in-data-selected:text-ds-primary text-sm leading-normal',

        // Outline
        'outline-hidden',

        // Highlighted State
        'data-highlighted:bg-ds-muted',

        // Selected State
        'data-selected:bg-ds-muted data-selected:font-semibold',

        // Disabled State
        'data-disabled:pointer-events-none data-disabled:opacity-50',

        // SVG sizing
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        className,
      )}
      {...props}
    >
      {children}
    </ComboboxPrimitive.Item>
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group data-slot="combobox-group" className={cn(className)} {...props} />
  );
}

function ComboboxLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn(
        // Sizing
        'px-2 py-1.5',

        // Typography & Color
        'text-ds-text-default text-xs',

        className,
      )}
      {...props}
    />
  );
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />;
}

function ComboboxEmpty({ className, children, ...props }: ComboboxPrimitive.Empty.Props) {
  const t = useTranslations('common.select');
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        // Structure
        'hidden w-full justify-center group-data-empty/combobox-content:flex',

        // Sizing
        'py-2',

        // Typography & Color
        'text-ds-text-muted text-center text-sm',

        className,
      )}
      {...props}
    >
      {children ?? t('noOptions')}
    </ComboboxPrimitive.Empty>
  );
}

function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn(
        // Sizing
        '-mx-1 my-1 h-px',

        // Color
        'bg-ds-border-muted',

        className,
      )}
      {...props}
    />
  );
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> & ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        // Structure
        'flex flex-wrap items-center gap-1 bg-clip-padding',

        // Sizing
        'min-h-12.25 px-2 py-1.5 has-data-[slot=combobox-chip]:px-1.5',

        // Borders, Ring & Outline
        'border-ds-border-soft hover:border-ds-border-default focus-within:border-ds-primary focus-within:ring-ds-ring rounded-lg border focus-within:ring',

        // Typography & Color
        'bg-ds-plain text-ds-text-plain text-sm',

        // Transitions
        'transition-colors',

        // Invalid State
        'has-aria-invalid:border-ds-danger has-aria-invalid:ring-ds-ring-danger has-aria-invalid:ring',

        // Disabled State
        'has-data-disabled:border-ds-border-muted has-data-disabled:bg-ds-muted has-data-disabled:cursor-not-allowed',

        className,
      )}
      {...props}
    />
  );
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        // Structure
        'flex w-fit items-center justify-center gap-1 whitespace-nowrap',

        // Sizing
        'h-[calc(--spacing(5.25))] px-1.5 has-data-[slot=combobox-chip-remove]:pe-0',

        // Borders
        'rounded-sm',

        // Typography & Color
        'bg-ds-muted text-ds-text-plain text-xs font-medium',

        // Disabled State
        'has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50',

        className,
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className="-ms-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipsInput({ className, placeholder, ...props }: ComboboxPrimitive.Input.Props) {
  const t = useTranslations('common.select');
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      placeholder={placeholder ?? t('placeholder')}
      className={cn(
        // Sizing
        'min-w-16 flex-1',

        // Typography & Color
        'text-ds-text-plain placeholder:text-ds-text-muted',

        // Outline
        'outline-none',

        className,
      )}
      {...props}
    />
  );
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
};
