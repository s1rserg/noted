import {
  TaskPriority,
  TaskStatus,
  type TaskPriorityValues,
  type TaskStatusValues,
} from 'types/task';

export const TaskStatusLabels: Record<TaskStatusValues, string> = {
  [TaskStatus.PENDING]: 'Pending',
  [TaskStatus.IN_PROGRESS]: 'In Progress',
  [TaskStatus.COMPLETED]: 'Completed',
};

export const TaskPriorityLabels: Record<TaskPriorityValues, string> = {
  [TaskPriority.LOW]: 'Low',
  [TaskPriority.MEDIUM]: 'Medium',
  [TaskPriority.HIGH]: 'High',
};

export const CreateTaskDefaultValues = {
  title: '',
  description: '',
  deadline: '',
  status: TaskStatus.PENDING,
  priority: TaskPriority.MEDIUM,
  tags: [],
};
