'use client';

import { cn } from '@/shared/lib/utils';
import { useLocale } from 'next-intl';
import localFont from 'next/font/local';

const edwardian = localFont({
  src: '../../../public/assets/fonts/Edwardian Script ITC Regular.ttf',
});

type AuthHeadlineProps = {
  text: string;
  className?: string;
};

export default function AuthHeadline({ text, className }: AuthHeadlineProps) {
  const locale = useLocale();

  return (
    <div
      className={cn(
        'text-ds-primary border-ds-border-soft mx-auto mb-6 border-b pb-4 text-center ltr:text-5xl rtl:text-4xl',
        locale === 'en' && edwardian.className,
        className,
      )}
    >
      <p>{text}</p>
    </div>
  );
}
