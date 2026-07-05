import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

interface SeparatorComponentProps {
  className?: string;
}

export default function SeparatorComponent({ className }: SeparatorComponentProps) {
  return (
    <div className={cn('relative mx-auto my-10 h-8 w-1/2', className)}>
      <Image src="/assets/images/separator.png" alt="Separator" fill className="dark:hidden" />
      <Image
        src="/assets/images/separator-dark.png"
        alt="Separator"
        fill
        className="hidden dark:block"
      />
    </div>
  );
}
