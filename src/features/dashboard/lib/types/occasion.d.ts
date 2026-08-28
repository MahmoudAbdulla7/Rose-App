import type { z } from 'zod';

import type { createOccasionSchema } from '../schemas/occasion.schema';

export type IOccasionFormInput = z.infer<ReturnType<typeof createOccasionSchema>>;
