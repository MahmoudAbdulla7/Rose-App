'use client';

import { subscribe } from '@/shared/lib/actions/subscription.actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FieldError } from 'shared/ui/field';

export default function SubscribeForm() {
  // Translation
  const t = useTranslations('footer.discount');

  // Schema
  const schema = z.object({ email: z.email(t('invalidEmail')) });

  // Form
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  // Functions
  const onSubmit = handleSubmit(async ({ email }) => {
    try {
      const res = await subscribe(email);

      if (!res.status) {
        const fieldError = res.errors?.find((e) => e.path === 'email');
        setError('email', { type: 'server', message: fieldError?.message ?? res.message });
        return;
      }

      toast.success(t('success'));
      reset();
    } catch {
      toast.error(t('error'));
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="max-lg:max-w-md">
      {/* Input + Button */}
      <div className="focus-within:ring-maroon-50 flex h-9.5 w-full items-center justify-between rounded-full bg-zinc-600 ps-4 focus-within:ring-1">
        <input
          type="email"
          placeholder={t('placeholder')}
          aria-label={t('placeholder')}
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-zinc-100 placeholder:text-zinc-400 focus:outline-none"
          {...register('email')}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          tabIndex={isSubmitting ? -1 : 0}
          className="bg-maroon-50 dark:bg-soft-pink-300 text-maroon-700 hover:bg-maroon-100 flex h-9.5 shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 dark:text-zinc-800"
        >
          {t('subscribe')}
          <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
        </button>
      </div>

      {/* Error */}
      <FieldError className="text-maroon-50 ps-4 pt-1.5 text-xs" errors={[errors.email]} />
    </form>
  );
}
