export const API_HEADERS = {
  JSON: {
    'Content-Type': 'application/json',
  },
  FORM_DATA: {
    'Content-Type': 'multipart/form-data',
  },
  AUTHORIZATION: (token: string) => ({
    Authorization: `Bearer ${token}`,
  }),
} as const;
