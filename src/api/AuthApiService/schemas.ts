import { z } from 'zod';

export const SignInLocalSchema = z.strictObject({
  email: z.email('Email is not valid'),
  password: z.string().min(6, 'Min password length is 6'),
});

export const SignUpLocalSchema = z.strictObject({}).extend(SignInLocalSchema.shape);
