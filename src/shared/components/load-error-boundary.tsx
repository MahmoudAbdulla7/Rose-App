'use client';

import { unstable_catchError, type ErrorInfo } from 'next/error';
import { useTranslations } from 'next-intl';

import EmptyState from '@/shared/components/empty-state';
import { Button } from '@/shared/ui/button';

export type LoadErrorBoundaryProps = {
  entity: string;
};

function LoadErrorFallback({ entity }: LoadErrorBoundaryProps, { unstable_retry }: ErrorInfo) {
  const t = useTranslations('common');
  const entityLabel = t(`entities.${entity}`);

  return (
    <EmptyState
      title={t('loadError.title', { entity: entityLabel })}
      subtitle={t('loadError.subtitle', { entity: entityLabel })}
    >
      <Button type="button" variant="primary" onClick={() => unstable_retry()}>
        {t('loadError.retry')}
      </Button>
    </EmptyState>
  );
}

const LoadErrorBoundary = unstable_catchError(LoadErrorFallback);

export default LoadErrorBoundary;
