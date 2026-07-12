import { parsePhoneNumber } from 'react-phone-number-input';
import * as z from 'zod';

import { GENDER } from '../constants/gender.constant';

/** True only for a valid Egyptian (+20) phone number in E.164 form. */
const isEgyptianPhone = (value: string) => {
  const parsed = parsePhoneNumber(value);
  return parsed?.country === 'EG' && parsed.isValid();
};

/** Translator scoped to the `register.validation` namespace. */
type IValidationTranslator = (key: string) => string;

export const createRegisterSchema = (t: IValidationTranslator) =>
  z
    .object({
      firstName: z.string().trim().min(1, t('first-name-required')),
      lastName: z.string().trim().min(1, t('last-name-required')),
      username: z.string().trim().min(1, t('username-required')),
      email: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, t('email-required'))
        .pipe(z.email(t('email-invalid'))),
      phone: z
        .string()
        .trim()
        .min(1, t('phone-required'))
        .refine(isEgyptianPhone, t('phone-invalid')),
      gender: z.enum(Object.values(GENDER), {
        error: t('gender-required'),
      }),
      password: z
        .string()
        .min(8, t('password-min'))
        .regex(/[a-z]/, t('password-lowercase'))
        .regex(/[A-Z]/, t('password-uppercase'))
        .regex(/\d/, t('password-digit'))
        .regex(/[^A-Za-z0-9]/, t('password-special')),
      confirmPassword: z.string().min(1, t('confirm-password-required')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwords-mismatch'),
      path: ['confirmPassword'],
    });
