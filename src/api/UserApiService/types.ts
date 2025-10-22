import type { Nullable } from 'types/utils';
import type { UpdateUserSchemaBase } from './schemas';
import type { infer as ZodInfer } from 'zod';

export type UpdateUserDto = ZodInfer<typeof UpdateUserSchemaBase>;

export interface User {
  id: number;
  email: string;
  name: Nullable<string>;
  surname: Nullable<string>;
  birthday: Nullable<Date>;
  createdAt: Date;
  updatedAt: Date;
}
