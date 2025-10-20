import { SignUpLocalSchema } from 'api';
import z from 'zod';

export const SignUpFormSchema = SignUpLocalSchema.extend({
  confirmPassword: z.string('Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
