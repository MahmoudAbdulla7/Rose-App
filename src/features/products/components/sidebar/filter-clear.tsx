import type { HoveredLinkProps } from '@/shared/components/hovered-link';
import HoveredLink from '@/shared/components/hovered-link';
import { X } from 'lucide-react';

export default function FilterClear({ ...props }: HoveredLinkProps & { text: string }) {
  return (
    <HoveredLink
      {...props}
      className="focus-visible:ring-ds-ring inline-flex items-center gap-1 text-sm text-red-600 transition-colors hover:text-red-700 focus-visible:ring-2 focus-visible:outline-none dark:text-red-400 dark:hover:text-red-300"
    >
      <X className="size-3.75 shrink-0" aria-hidden="true" strokeWidth={2} />
      <span>{props?.text}</span>
    </HoveredLink>
  );
}
