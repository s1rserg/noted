import type { infer as ZodInfer } from 'zod';
import type { SignInLocalSchemaBase, SignUpLocalSchemaBase } from './schemas';

export type SignInLocalDto = ZodInfer<typeof SignInLocalSchemaBase>;

export type SignUpLocalDto = ZodInfer<typeof SignUpLocalSchemaBase>;

export type AuthResponse = {
  accessToken: string;
};
