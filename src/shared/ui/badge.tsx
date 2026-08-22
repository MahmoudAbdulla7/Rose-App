'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'shared/lib/utils';

const badgeVariants = cva(
  'group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        primary: 'bg-ds-primary text-ds-text-inverse hover:bg-ds-primary-saturated',
        secondary: 'bg-ds-secondary-faint text-ds-primary hover:bg-ds-secondary-fade',
        subtle: 'bg-ds-soft text-ds-text-plain hover:bg-ds-muted',
        muted: 'bg-ds-muted text-ds-text-plain hover:bg-ds-soft',
      },
      behavior: {
        interactive: 'cursor-pointer',
        static: 'pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'primary',
      behavior: 'static',
    },
  },
);

function Badge({
  className,
  variant = 'primary',
  behavior = 'static',
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant, behavior }), className),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      variant,
      behavior,
    },
  });
}

export { Badge, badgeVariants };
