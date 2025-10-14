import { TaskPriority, TaskStatus } from 'types/task';
import { z } from 'zod';

const today = new Date().toISOString().split('T')[0] as string;

export const CreateTaskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').nonempty('Title is required'),
  description: z
    .string()
    .min(5, 'Description must be at least 5 characters')
    .nonempty('Description is required'),
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
        message: 'Deadline cannot be in the past',
      },
    ),
  priority: z.enum(Object.values(TaskPriority)),
  status: z.enum(Object.values(TaskStatus)),
  tags: z.array(z.string()).optional(),
});
