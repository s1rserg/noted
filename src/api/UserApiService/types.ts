import type { CreateUserSchema, UpdateUserSchema } from './schemas';

import type { Nullable } from 'types/utils';
import type { infer as ZodInfer } from 'zod';

export type CreateUserDto = ZodInfer<typeof CreateUserSchema>;
export type UpdateUserDto = ZodInfer<typeof UpdateUserSchema>;

export interface User {
  id: number;
  email: string;
  name: Nullable<string>;
  surname: Nullable<string>;
  birthday: Nullable<Date>;
  createdAt: Date;
  updatedAt: Date;
}
