export const STEP = {
  EMAIL: 'EMAIL',
  SENT: 'SENT',
} as const;

export type Step = (typeof STEP)[keyof typeof STEP];
