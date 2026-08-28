import type { z } from 'zod';

import type { createCategorySchema } from '../schemas/category.schema';

export type ICategoryFormInput = z.infer<ReturnType<typeof createCategorySchema>>;
