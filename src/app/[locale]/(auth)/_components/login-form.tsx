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
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';

export default function LoginForm() {
  const t = useTranslations('login');
  const tToast = useTranslations('common.toast');
  const router = useRouter();

  const loginSchema = createLoginSchema({
    usernameRequired: t('validation.usernameRequired'),
    usernameFormat: t('validation.usernameFormat'),
    passwordRequired: t('validation.passwordRequired'),
    passwordNumber: t('validation.passwordNumber'),
    passwordSpecial: t('validation.passwordSpecial'),
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setFocus,
    setError,
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

  const onSubmit = async (data: LoginFormValues) => {
    const res = await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
      rememberMe: data.rememberMe ? 'true' : 'false',
    });

    if (res?.ok) {
      saveRememberedUser(data.rememberMe, data.username);
      router.push('/');
      return;
    }

    const { message, fieldErrors } = parseSignInError(res?.error, t('messages.invalidCredentials'));

    fieldErrors?.forEach(({ path, message }) => setError(path, { message }));

    if (!fieldErrors?.length) {
      toast.error(tToast('error'), { description: message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex w-full flex-col gap-4">
      <Input
        type="text"
        label={t('fields.username')}
        placeholder={t('placeholder.username')}
        error={errors.username?.message}
        className="font-inter"
        {...register('username')}
      />

      <PasswordInput
        label={t('fields.password')}
        placeholder={t('placeholder.password')}
        error={errors.password?.message}
        {...register('password')}
      />

      <div className="flex items-center justify-end gap-3">
        <Link
          href="/forgot-password"
          className="font-primary text-ds-primary-saturated hover:text-ds-primary text-sm leading-none font-semibold whitespace-nowrap"
        >
          {t('actions.forgotPassword')}
        </Link>
      </div>
      <label className="my-4 flex cursor-pointer items-center gap-2">
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
