import type { z } from 'zod';
import type { createRegisterSchema } from '../schemas/register.schema';

export type IRegisterFields = z.infer<ReturnType<typeof createRegisterSchema>>;
