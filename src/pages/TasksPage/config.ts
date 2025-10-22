import {
  TaskPriority,
  TaskStatus,
  type Task,
  type TaskPriorityValues,
  type TaskStatusValues,
} from 'types/task';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Task 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    deadline: '2025-10-20',
    tags: ['UI', 'Frontend'],
    createdAt: '2025-10-16T07:26:16.897Z',
    updatedAt: '2025-10-16T07:26:16.897Z',
  },
  {
    id: '2',
    title: 'Task 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    status: TaskStatus.PENDING,
    priority: TaskPriority.MEDIUM,
    createdAt: '2025-10-14T07:26:16.897Z',
    updatedAt: '2025-10-16T07:26:16.897Z',
  },
  {
    id: '3',
    title: 'Task 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    tags: ['Bug', 'Auth'],
    createdAt: '2025-10-13T07:26:16.897Z',
    updatedAt: '2025-10-16T07:26:16.897Z',
  },
  {
    id: '4',
    title: 'Task 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    status: TaskStatus.PENDING,
    priority: TaskPriority.LOW,
    deadline: '2025-11-01',
    createdAt: '2025-10-12T07:26:16.897Z',
    updatedAt: '2025-10-16T07:26:16.897Z',
  },
];

export const TaskStatusLabels: Record<TaskStatusValues, string> = {
  [TaskStatus.PENDING]: 'statusOptions.pending',
  [TaskStatus.IN_PROGRESS]: 'statusOptions.in_progress',
  [TaskStatus.COMPLETED]: 'statusOptions.completed',
};

export const TaskPriorityLabels: Record<TaskPriorityValues, string> = {
  [TaskPriority.LOW]: 'priorityOptions.low',
  [TaskPriority.MEDIUM]: 'priorityOptions.medium',
  [TaskPriority.HIGH]: 'priorityOptions.high',
};

export const OrderMap = {
  priority: {
    [TaskPriority.HIGH]: 1,
    [TaskPriority.MEDIUM]: 2,
    [TaskPriority.LOW]: 3,
  },
  status: {
    [TaskStatus.IN_PROGRESS]: 1,
    [TaskStatus.PENDING]: 2,
    [TaskStatus.COMPLETED]: 3,
  },
};
