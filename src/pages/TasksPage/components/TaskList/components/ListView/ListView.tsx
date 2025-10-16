import { Stack } from '@mui/material';
import { TaskItem, TaskItemSkeleton } from './components';
import type { FC } from 'react';
import type { Task } from 'types/task';

interface Props {
  tasks: Task[];
  onTaskClick: (id: Task['id']) => void;
  isLoading: boolean;
}

export const ListView: FC<Props> = ({ tasks, onTaskClick, isLoading }) => {
  if (isLoading) {
    return (
      <Stack spacing={2}>
        {Array.from({ length: 8 }, (_, i) => i).map((i) => (
          <TaskItemSkeleton key={i} />
        ))}
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onClick={onTaskClick} />
      ))}
    </Stack>
  );
};
