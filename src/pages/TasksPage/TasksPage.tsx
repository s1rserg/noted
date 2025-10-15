import { Box } from '@mui/material';
import { mockTasks } from './config';
import { toast } from 'react-toastify';
import { type FC, useState } from 'react';
import { TaskStatus, type Task } from 'types/task';
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

  const handleCompleteTask = (id: Task['id']) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, status: TaskStatus.COMPLETED } : task)),
    );
    toast.success('Task was completed successfully.');
  };

  const handleDeleteTask = (id: Task['id']) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success('Task was deleted successfully.');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
      <ControlHeader
        open={isHeaderOpen}
        toggleOpen={handleToggleHeader}
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        mode="grid"
        onCompleteTask={handleCompleteTask}
        onDeleteTask={handleDeleteTask}
      />
    </Box>
  );
};

export default TasksPage;
