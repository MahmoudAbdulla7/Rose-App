import { z } from 'zod';

type LoginSchemaMessages = {
  usernameRequired: string;
  usernameFormat: string;
  passwordRequired: string;
  passwordNumber: string;
  passwordSpecial: string;
};

export function createLoginSchema(messages: LoginSchemaMessages) {
  return z.object({
    username: z
      .string()
      .min(1, messages.usernameRequired)
      .regex(/^[a-zA-Z0-9_]+$/, messages.usernameFormat),
    password: z
      .string()
      .min(1, messages.passwordRequired)
      .regex(/[0-9]/, messages.passwordNumber)
      .regex(/[^a-zA-Z0-9]/, messages.passwordSpecial),
    rememberMe: z.boolean(),
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
