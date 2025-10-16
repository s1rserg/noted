import { Box } from '@mui/material';
import { mockTasks } from './config';
import { processTasks } from './helpers/processTasks';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'hooks';
import { useSearchParams } from 'react-router-dom';
import { type FC, useCallback, useMemo, useState } from 'react';
import { TaskStatus, type Task } from 'types/task';
import { ControlHeader, TaskList, type CreateTaskFormData } from './components';
import { FilterSortDefaults, QueryKeys, ViewMode, type ViewModeValues } from './types';

const TasksPage: FC = () => {
  const [viewMode, setViewMode] = useLocalStorage<ViewModeValues>('taskViewMode', ViewMode.GRID);
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get(QueryKeys.SEARCH) ?? '';
  const sortBy = searchParams.get(QueryKeys.SORT_BY) ?? FilterSortDefaults.SORT_BY;
  const sortOrder = searchParams.get(QueryKeys.SORT_ORDER) ?? FilterSortDefaults.SORT_ORDER;
  const statusFilter = searchParams.get(QueryKeys.STATUS) ?? FilterSortDefaults.FILTER_ALL;
  const priorityFilter = searchParams.get(QueryKeys.PRIORITY) ?? FilterSortDefaults.FILTER_ALL;

  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);

  const processedTasks = useMemo(
    () =>
      processTasks({
        tasks,
        searchQuery,
        sortBy,
        sortOrder,
        statusFilter,
        priorityFilter,
      }),
    [tasks, searchQuery, sortBy, sortOrder, statusFilter, priorityFilter],
  );

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

  const handleToggleHeader = () => {
    setIsHeaderOpen((prev) => !prev);
  };

  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === ViewMode.GRID ? ViewMode.LIST : ViewMode.GRID));
  };

  const handleAddTask = (taskData: CreateTaskFormData) => {
    const newTask = {
      ...taskData,
      id: new Date().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

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
        tasks={processedTasks}
        viewMode={viewMode}
        onCompleteTask={handleCompleteTask}
        onDeleteTask={handleDeleteTask}
      />
    </Box>
  );
};

export default TasksPage;
