import { z } from 'zod';
import type { TFunction } from 'i18next';

export const UpdateUserSchemaBase = z
  .strictObject({
    name: z.string().optional(),
    surname: z.string().optional(),
    birthday: z.string().optional(),
  })
  .partial();

export const getUpdateUserSchema = (t: TFunction) =>
  z
    .strictObject({
      name: z.string().min(2, t('validation.nameMin')).optional(),
      surname: z.string().min(2, t('validation.surnameMin')).optional(),
      birthday: z.coerce.date().optional(),
    })
    .partial();
