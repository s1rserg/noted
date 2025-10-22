import { z } from 'zod';
import type { TFunction } from 'i18next';
import { getSignUpLocalSchema, SignUpLocalSchemaBase } from 'api';

export const SignUpFormSchemaBase = SignUpLocalSchemaBase.extend({
  confirmPassword: z.string(),
});

export const getSignUpFormSchema = (t: TFunction) =>
  getSignUpLocalSchema(t)
    .extend({
      confirmPassword: z.string().min(1, t('validation.confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validation.passwordsDontMatch'),
      path: ['confirmPassword'],
    });
