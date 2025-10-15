import { Box } from '@mui/material';
import { mockTasks } from './config';
import { type FC, useState } from 'react';
import { type Task } from 'types/task';
import { ControlHeader, TaskList, type CreateTaskFormData } from './components';

const TasksPage: FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  const handleToggleHeader = () => {
    setIsHeaderOpen((prev) => !prev);
  };

  const handleAddTask = (taskData: CreateTaskFormData) => {
    const newTask = { ...taskData, id: new Date().toString() };
    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
      <ControlHeader
        open={isHeaderOpen}
        toggleOpen={handleToggleHeader}
        onAddTask={handleAddTask}
      />
      <TaskList tasks={tasks} mode="grid" />
    </Box>
  );
};

export default TasksPage;
