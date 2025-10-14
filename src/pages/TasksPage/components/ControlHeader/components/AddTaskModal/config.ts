import { TaskPriority, TaskStatus } from 'types/task';

export const CreateTaskDefaultValues = {
  title: '',
  description: '',
  deadline: '',
  status: TaskStatus.PENDING,
  priority: TaskPriority.MEDIUM,
  tags: [],
};
