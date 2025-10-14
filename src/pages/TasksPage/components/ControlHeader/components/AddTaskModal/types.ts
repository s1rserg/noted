import type { infer as ZodInfer } from 'zod';
import type { CreateTaskSchema } from './schema';

export type CreateTaskFormData = ZodInfer<typeof CreateTaskSchema>;
