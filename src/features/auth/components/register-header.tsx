'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

interface IRegisterHeaderProps {
  title: string;
  description?: ReactNode;
}

export function RegisterHeader({ title, description }: IRegisterHeaderProps) {
  // Translation
  const t = useTranslations('auth.register');

  return (
    <div className="border-ds-border-muted flex flex-col gap-4 border-b pb-4">
      {/* Page title */}
      <h1 className="text-ds-text-plain text-2xl leading-none font-bold">{t('heading')}</h1>

      {/* Step header */}
      <div className="space-y-1">
        {/* Step title */}
        <h2 className="text-ds-primary text-xl leading-none font-semibold">{title}</h2>

        {/* Step description */}
        {description && <p className="text-ds-text-default text-sm">{description}</p>}
      </div>
    </div>
  );
}
