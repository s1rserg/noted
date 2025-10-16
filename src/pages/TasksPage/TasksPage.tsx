import { Box } from '@mui/material';
import { mockTasks } from './config';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'hooks';
import { type FC, useCallback, useState } from 'react';
import { TaskStatus, type Task } from 'types/task';
import { ControlHeader, TaskList, type CreateTaskFormData } from './components';
import { ViewMode, type ViewModeValues } from './types';

const TasksPage: FC = () => {
  const [viewMode, setViewMode] = useLocalStorage<ViewModeValues>('taskViewMode', ViewMode.GRID);

  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  const handleToggleHeader = () => {
    setIsHeaderOpen((prev) => !prev);
  };

  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === ViewMode.GRID ? ViewMode.LIST : ViewMode.GRID));
  };

  const handleAddTask = (taskData: CreateTaskFormData) => {
    const newTask = { ...taskData, id: new Date().toString() };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleCompleteTask = useCallback((id: Task['id']) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, status: TaskStatus.COMPLETED } : task)),
    );
    toast.success('Task was completed successfully.');
  }, []);

  const handleDeleteTask = useCallback((id: Task['id']) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success('Task was deleted successfully.');
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
      <ControlHeader
        open={isHeaderOpen}
        toggleOpen={handleToggleHeader}
        onAddTask={handleAddTask}
        viewMode={viewMode}
        toggleViewMode={handleToggleViewMode}
      />
      <TaskList
        tasks={tasks}
        viewMode={viewMode}
        onCompleteTask={handleCompleteTask}
        onDeleteTask={handleDeleteTask}
      />
    </Box>
  );
};

export default TasksPage;
