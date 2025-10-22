import { TaskPriority, TaskStatus } from 'types/task';
import { z } from 'zod';
import type { TFunction } from 'i18next';

const today = new Date().toISOString().split('T')[0] as string;

export const CreateTaskSchemaBase = z.object({
  title: z.string(),
  description: z.string(),
  deadline: z.string().optional(),
  priority: z.enum(Object.values(TaskPriority)),
  status: z.enum(Object.values(TaskStatus)),
  tags: z.array(z.string()).optional(),
});

export const getCreateTaskSchema = (t: TFunction) =>
  CreateTaskSchemaBase.extend({
    title: z
      .string()
      .min(1, t('add.validation.titleRequired'))
      .min(3, t('add.validation.titleMin')),
    description: z
      .string()
      .min(1, t('add.validation.descriptionRequired'))
      .min(5, t('add.validation.descriptionMin')),
    deadline: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) {
            return true;
          }
          return val >= today;
        },
        {
          message: t('add.validation.deadlinePast'),
        },
      ),
  });
