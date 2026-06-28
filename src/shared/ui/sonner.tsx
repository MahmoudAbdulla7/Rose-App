'use client';

import { AlertTriangle, Check, Info, Loader2Icon, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <Check size={18} className="text-ds-success" />,
        error: <X size={18} className="text-ds-danger" />,
        info: <Info size={18} />,
        warning: <AlertTriangle size={18} className="text-ds-warning" />,
        close: <X size={15} className="text-ds-text-default" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'cn-toast text-ds-text-plain! border! dark:border-none!',
          success: 'bg-ds-success-fade!',
          error: 'bg-ds-danger-fade!',
          info: 'bg-ds-muted!',
          warning: 'bg-ds-warning-fade!',
          closeButton:
            'rounded-none! top-2.5! left-full! -translate-x-full! bg-transparent! border-none!',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
