import { z } from 'zod';
import type { CreateTaskSchema } from './schema';

export type CreateTaskFormData = z.infer<typeof CreateTaskSchema>;
