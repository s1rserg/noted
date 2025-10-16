import { TaskPriority, TaskStatus } from 'types/task';
import { TaskPriorityLabels, TaskStatusLabels } from '../../../../../../config';

export const StatusFilterOptions = [
  { value: 'all', label: 'All statuses' },
  ...Object.values(TaskStatus).map((s) => ({
    value: s,
    label: TaskStatusLabels[s],
  })),
];

export const PriorityFilterOptions = [
  { value: 'all', label: 'All priorities' },
  ...Object.values(TaskPriority).map((p) => ({ value: p, label: TaskPriorityLabels[p] })),
];
