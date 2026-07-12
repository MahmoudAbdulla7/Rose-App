import { parsePhoneNumber } from 'react-phone-number-input';
import * as z from 'zod';

import { GENDER } from '../constants/gender.constant';

/** True only for a valid Egyptian (+20) phone number in E.164 form. */
const isEgyptianPhone = (value: string) => {
  const parsed = parsePhoneNumber(value);
  return parsed?.country === 'EG' && parsed.isValid();
};

/** Translator scoped to the `auth.register.validation` namespace. */
type IValidationTranslator = (key: string) => string;

export const createRegisterSchema = (t: IValidationTranslator) =>
  z
    .object({
      firstName: z.string().trim().min(1, t('firstNameRequired')),
      lastName: z.string().trim().min(1, t('lastNameRequired')),
      username: z.string().trim().min(1, t('usernameRequired')),
      email: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, t('emailRequired'))
        .pipe(z.email(t('emailInvalid'))),
      phone: z
        .string()
        .trim()
        .min(1, t('phoneRequired'))
        .refine(isEgyptianPhone, t('phoneInvalid')),
      gender: z.enum(Object.values(GENDER), {
        error: t('genderRequired'),
      }),
      password: z
        .string()
        .min(8, t('passwordMin'))
        .regex(/[a-z]/, t('passwordLowercase'))
        .regex(/[A-Z]/, t('passwordUppercase'))
        .regex(/\d/, t('passwordDigit'))
        .regex(/[^A-Za-z0-9]/, t('passwordSpecial')),
      confirmPassword: z.string().min(1, t('confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordsMismatch'),
      path: ['confirmPassword'],
    });
