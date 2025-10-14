import type { ValueOf } from './utils';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: ValueOf<typeof TaskStatus>;
  priority: ValueOf<typeof TaskPriority>;
  tags?: string[];
  deadline?: string;
};

export const TaskPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export const TaskStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  IN_PROGRESS: 'in_progress',
} as const;
