export const REGISTER_STEP = {
  EMAIL: 'email',
  OTP: 'otp',
  DETAILS: 'details',
  PASSWORD: 'password',
} as const;

export type RegisterStep = (typeof REGISTER_STEP)[keyof typeof REGISTER_STEP];

export const REGISTER_STEP_ORDER: RegisterStep[] = [
  REGISTER_STEP.EMAIL,
  REGISTER_STEP.OTP,
  REGISTER_STEP.DETAILS,
  REGISTER_STEP.PASSWORD,
];
