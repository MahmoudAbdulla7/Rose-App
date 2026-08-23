'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useRememberMe } from '@/features/auth/hooks/useRememberMe';
import { createLoginSchema, type LoginFormValues } from '@/features/auth/lib/schemas/login.schema';
import { Link, useRouter } from '@/i18n/navigation';
import { parseSignInError } from '@/lib/auth/parseSignInError';
import { safeCallbackUrl } from '@/shared/lib/utils/callback-url.utils';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';
import { Separator } from '@/shared/ui/separator';

type LoginFormProps = {
  /** Overrides `?callbackUrl` from the URL when provided (e.g. dialog on product page). */
  callbackUrl?: string | null;
  /** Called after a successful sign-in, before navigating to `callbackUrl`. */
  onSuccess?: () => void;
};

export default function LoginForm({ callbackUrl, onSuccess }: LoginFormProps) {
  // Translations
  const t = useTranslations('auth.login');
  const tShared = useTranslations('auth.shared');
  const tCommon = useTranslations('common');
  const tToast = useTranslations('common.toast');
  const networkErrorMessage = tCommon('error.networkError');

  // Navigation
  const router = useRouter();

  // Form
  const loginSchema = createLoginSchema({
    usernameRequired: t('validation.usernameRequired'),
    usernameFormat: t('validation.usernameFormat'),
    passwordRequired: t('validation.passwordRequired'),
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const { saveRememberedUser } = useRememberMe<LoginFormValues>({ setValue, setFocus });

  // Functions
  const onSubmit = async (data: LoginFormValues) => {
    clearErrors('root');

    let res;
    try {
      res = await signIn('credentials', {
        redirect: false,
        username: data.username,
        password: data.password,
        // NextAuth credentials fields are serialized as strings.
        rememberMe: data.rememberMe ? 'true' : 'false',
      });
    } catch {
      toast.error(tToast('error'), { description: networkErrorMessage });
      return;
    }

    if (res?.ok) {
      saveRememberedUser(data.rememberMe, data.username);
      onSuccess?.();
      router.push(
        safeCallbackUrl(
          callbackUrl ?? new URLSearchParams(window.location.search).get('callbackUrl'),
          window.location.origin,
        ),
      );
      router.refresh();
      return;
    }

    const { kind, message, fieldErrors } = parseSignInError(
      res?.error,
      t('messages.invalidCredentials'),
      networkErrorMessage,
    );

    // Map backend field-level errors to RHF so each message appears under its input.
    fieldErrors?.forEach(({ path, message: fieldMessage }) =>
      setError(path, { message: fieldMessage }),
    );

    if (fieldErrors?.length) {
      return;
    }

    // Keep invalid credentials visible inline while the user corrects input.
    if (kind === 'credentials') {
      setError('root', { message });
      return;
    }

    toast.error(tToast('error'), { description: message });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
      <Input
        type="text"
        label={tShared('fields.username')}
        placeholder={t('placeholder.username')}
        error={errors.username?.message}
        className="font-inter"
        {...register('username')}
      />

      <PasswordInput
        label={tShared('fields.password')}
        placeholder={tShared('placeholder.password')}
        error={errors.password?.message}
        {...register('password')}
      />

      <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-2">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            )}
          />
          <span className="font-inter text-ds-text-plain text-sm leading-none">
            {t('actions.rememberMe')}
          </span>
        </label>
        <Link
          href="/forgot-password"
          className="font-primary text-ds-primary-saturated hover:text-ds-primary text-sm leading-none font-semibold whitespace-nowrap"
        >
          {t('actions.forgotPassword')}
        </Link>
      </div>

      {errors.root?.message && (
        <p role="alert" className="text-ds-danger font-inter text-sm">
          {errors.root.message}
        </p>
      )}

      <Separator />

      <Button type="submit" variant="primary" loading={isSubmitting} className="w-full">
        {t('actions.submit')}
      </Button>

      <p className="font-primary text-ds-text-plain text-center text-sm leading-none">
        {t('footer.noAccount')}{' '}
        <Link
          href="/register"
          className="text-ds-primary-saturated hover:text-ds-primary font-bold"
        >
          {t('actions.createAccount')}
        </Link>
      </p>
    </form>
  );
}
