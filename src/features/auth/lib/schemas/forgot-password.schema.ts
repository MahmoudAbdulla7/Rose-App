import z from 'zod';
import { createRegisterSchema } from './register.schema';

export const emailSchema = z.object({
  email: z.email(),
});

const schemaInstance = createRegisterSchema((key: string) => key);

export const resetPasswordSchema = z
  .object({
    password: schemaInstance.shape.password,
    confirmPassword: schemaInstance.shape.confirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
