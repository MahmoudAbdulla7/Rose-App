'use client';
import { cn } from '@/shared/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface className {
  className?: string;
}

export default function SeparatorComponent({ className }: className) {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <div className={cn(`relative mx-auto my-10 h-8 w-1/2 ${className}`)}>
      <Image src={`/assets/images/separator${isDark ? '-dark' : ''}.png`} alt="separator" fill />
    </div>
  );
}
