import type { Nullable } from 'types/utils';
import type { UpdateUserSchema } from './schemas';
import type { infer as ZodInfer } from 'zod';

export type UpdateUserDto = ZodInfer<typeof UpdateUserSchema>;

export interface UserAvatarMedia {
  id: number;
  createdAt: string;
  width: number;
  height: number;
  secureUrl: string;
}

export interface User {
  id: number;
  email: string;
  name: Nullable<string>;
  surname: Nullable<string>;
  birthday: Nullable<Date>;
  createdAt: Date;
  updatedAt: Date;
  avatar: Nullable<UserAvatarMedia>;
}
