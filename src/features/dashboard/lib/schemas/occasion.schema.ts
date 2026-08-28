import * as z from 'zod';

type IValidationTranslator = (key: string) => string;

/** Only the title is required; description and image are optional. */
export const createOccasionSchema = (t: IValidationTranslator) =>
  z.object({
    title: z.string().trim().min(1, t('nameRequired')),
    description: z.string().trim(),
    image: z.instanceof(File).optional(),
  });
