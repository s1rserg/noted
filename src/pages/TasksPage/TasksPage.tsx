import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'hooks';
import { useSearchParams } from 'react-router-dom';
import { type FC, useCallback, useEffect, useState } from 'react';
import { TaskStatus, type Task } from 'types/task';
import { ControlHeader, TaskList } from './components';
import { ViewMode, type ViewModeValues } from './types';
import { useTranslation } from 'react-i18next';
import { handleApiError, httpClient, taskApiService, type CreateTaskDto } from 'api';
import { getQueryParameters } from './helpers/getQueryParams';

const TasksPage: FC = () => {
  const { t } = useTranslation('tasksPage');
  const [viewMode, setViewMode] = useLocalStorage<ViewModeValues>('taskViewMode', ViewMode.GRID);
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);

  const fetchTasks = useCallback(
    async (signal?: AbortSignal) => {
      setIsLoading(true);

      try {
        const requestConfig = taskApiService.findAll(getQueryParameters(searchParams), signal);
        const response = await httpClient.request<Task[]>(requestConfig);

        setTasks(response.data);
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchParams],
  );

  const handleCompleteTask = useCallback(
    (id: Task['id']) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status: TaskStatus.COMPLETED } : task,
        ),
      );
      toast.success(t('complete.successMsg'));
    },
    [t],
  );

  const handleDeleteTask = useCallback(
    (id: Task['id']) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      toast.success(t('delete.successMsg'));
    },
    [t],
  );

  const handleToggleHeader = () => {
    setIsHeaderOpen((prev) => !prev);
  };

  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === ViewMode.GRID ? ViewMode.LIST : ViewMode.GRID));
  };

  const handleAddTask = async (taskData: CreateTaskDto) => {
    try {
      const requestConfig = taskApiService.create(taskData);
      await httpClient.request<Task[]>(requestConfig);
      toast.success(t('add.successMsg'));

      void fetchTasks();

      return true;
    } catch (error) {
      handleApiError(error);
      return false;
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    void fetchTasks(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchTasks]);

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
        isLoading={isLoading}
      />
    </Box>
  );
};

export default TasksPage;
