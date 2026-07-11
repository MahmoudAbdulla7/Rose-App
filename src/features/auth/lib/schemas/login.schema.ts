import { z } from 'zod';

type LoginSchemaMessages = {
  usernameRequired: string;
  usernameFormat: string;
  passwordRequired: string;
};

export function createLoginSchema(messages: LoginSchemaMessages) {
  return z.object({
    username: z
      .string()
      .min(1, messages.usernameRequired)
      .regex(/^[a-zA-Z0-9_]+$/, messages.usernameFormat),
    password: z.string().min(1, messages.passwordRequired),
    rememberMe: z.boolean(),
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
