'use client';

import { Component, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import EmptyState from '@/shared/components/empty-state';
import { Button } from '@/shared/ui/button';

export type LoadErrorBoundaryProps = {
  entity: string;
  children: ReactNode;
};

function LoadErrorFallback({ entity, onRetry }: LoadErrorBoundaryProps & { onRetry: () => void }) {
  const t = useTranslations('common');
  const entityLabel = t(`entities.${entity}`);

  return (
    <EmptyState
      title={t('loadError.title', { entity: entityLabel })}
      subtitle={t('loadError.subtitle', { entity: entityLabel })}
    >
      <Button type="button" variant="primary" onClick={onRetry}>
        {t('loadError.retry')}
      </Button>
    </EmptyState>
  );
}

class LoadErrorBoundary extends Component<LoadErrorBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <LoadErrorFallback {...this.props} onRetry={() => this.setState({ hasError: false })} />
      );
    }

    return this.props.children;
  }
}

export default LoadErrorBoundary;
