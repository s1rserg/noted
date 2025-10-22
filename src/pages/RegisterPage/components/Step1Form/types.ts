import type { input } from 'zod';
import type { SignUpFormSchemaBase } from './schemas';

export type SignUpFormInput = input<typeof SignUpFormSchemaBase>;
