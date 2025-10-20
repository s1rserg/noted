import type { infer as ZodInfer } from 'zod';
import type { CreateUserSchema, UpdateUserSchema } from './schemas';

export type CreateUserDto = ZodInfer<typeof CreateUserSchema>;
export type UpdateUserDto = ZodInfer<typeof UpdateUserSchema>;
