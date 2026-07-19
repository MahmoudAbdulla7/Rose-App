import { routing } from '@/i18n/routing';

export const API_HEADERS = {
  JSON: {
    'Content-Type': 'application/json',
  },
  FORM_DATA: {
    'Content-Type': 'multipart/form-data',
  },
  ACCEPT_LANGUAGE: (locale: string) => ({
    'Accept-Language': locale || routing.defaultLocale,
  }),
  AUTHORIZATION: (token: string) => ({
    Authorization: `Bearer ${token}`,
  }),
} as const;
