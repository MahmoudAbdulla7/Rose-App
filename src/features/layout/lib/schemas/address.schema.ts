import * as z from 'zod';

import { createRegisterSchema } from '@/features/auth/lib/schemas/register.schema';

type IValidationTranslator = (key: string) => string;

export const createAddressSchema = (
  tAddress: IValidationTranslator,
  tRegister: IValidationTranslator,
) => {
  const registerSchema = createRegisterSchema(tRegister);

  return z.object({
    city: z.string().trim().min(1, tAddress('cityRequired')),
    street: z.string().trim().min(1, tAddress('addressRequired')),
    phone: registerSchema.shape.phone,
  });
};
