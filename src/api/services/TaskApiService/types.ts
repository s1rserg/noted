import type { TaskPriorityValues, TaskStatusValues } from 'types/task';
import type { infer as ZodInfer } from 'zod';
import type { CreateTaskSchema } from './schemas';

export type CreateTaskDto = ZodInfer<typeof CreateTaskSchema>;

export const SORT_BY_FIELDS = ['createdAt', 'title', 'status', 'priority'] as const;

export const SortBy = {
  CREATED_AT: 'createdAt',
  TITLE: 'title',
  STATUS: 'status',
  PRIORITY: 'priority',
} as const;

export const SortOrder = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type StatusFilterValues = TaskStatusValues | 'all';
export type PriorityFilterValues = TaskPriorityValues | 'all';

export type TaskQueryParameters = {
  q?: string;
  searchBy?: string;

  sortBy?: string;
  order?: string;

  status?: string;
  priority?: string;

  page?: number;
  perPage?: number;
};
