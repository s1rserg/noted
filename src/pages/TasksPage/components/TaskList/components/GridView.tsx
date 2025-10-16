import { Grid } from '@mui/material';
import { TaskCard, TaskCardSkeleton } from '../../TaskCard';
import type { FC } from 'react';
import type { Task } from 'types/task';

interface Props {
  tasks: Task[];
  onCompleteTask: (id: Task['id']) => void;
  onDeleteTask: (id: Task['id']) => void;
  isLoading: boolean;
}

export const GridView: FC<Props> = ({ tasks, onCompleteTask, onDeleteTask, isLoading }) => {
  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 8 }, (_, i) => i).map((i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <TaskCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <TaskCard task={task} onComplete={onCompleteTask} onDelete={onDeleteTask} />
        </Grid>
      ))}
    </Grid>
  );
};
