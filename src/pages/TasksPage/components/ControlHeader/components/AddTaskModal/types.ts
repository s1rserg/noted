import type { infer as ZodInfer } from 'zod';
import type { CreateTaskSchemaBase } from './schema';

export type CreateTaskFormData = ZodInfer<typeof CreateTaskSchemaBase>;
