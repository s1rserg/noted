import { Grid } from '@mui/material';
import { TaskCard } from '../../TaskCard';
import type { FC } from 'react';
import type { Task } from 'types/task';

interface Props {
  tasks: Task[];
  onCompleteTask: (id: Task['id']) => void;
  onDeleteTask: (id: Task['id']) => void;
}

export const GridView: FC<Props> = ({ tasks, onCompleteTask, onDeleteTask }) => {
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
