// Forogt password

export type ForgotPasswordResponse = {
  status: boolean;
  code: number;
  message: string;
  payload?: string | null;
};

export type ForgotPasswordRequestBody = {
  email: string;
};

export type FormData = {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

export type Step = (typeof STEP)[keyof typeof STEP];

// Reset password

export type ResetPasswordResponse = {
  status: boolean;
  code: number;
  message: string;
};

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
