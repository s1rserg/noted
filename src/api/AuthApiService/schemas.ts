import { z } from 'zod';
import type { TFunction } from 'i18next';

export const SignInLocalSchemaBase = z.strictObject({
  email: z.string(),
  password: z.string(),
});

export const getSignInLocalSchema = (t: TFunction) =>
  SignInLocalSchemaBase.extend({
    email: z.email(t('validation.email')),
    password: z.string().min(6, t('validation.passwordMin')),
  });

export const SignUpLocalSchemaBase = SignInLocalSchemaBase.extend({});

export const getSignUpLocalSchema = (t: TFunction) =>
  z.strictObject({}).extend(getSignInLocalSchema(t).shape);
