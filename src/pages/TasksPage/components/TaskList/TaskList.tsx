import { Box, Grid } from '@mui/material';
import { TaskCard } from '../TaskCard';
import { type FC } from 'react';
import type { Task } from 'types/task';
import type { ViewMode } from 'pages/TasksPage/types';

interface TaskListProps {
  tasks: Task[];
  mode: ViewMode;
}

export const TaskList: FC<TaskListProps> = ({ tasks }) => {
  const handleComplete = (id: string) => alert(`Complete task: ${id}`);
  const handleDelete = (id: string) => {
    alert(`Delete task: ${id}`);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <TaskCard task={task} onComplete={handleComplete} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
