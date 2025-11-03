import { useCallback, type Dispatch, type SetStateAction } from 'react';
import { handleApiError, httpClient, taskApiService } from 'api';
import type { Task } from 'types/task';
import type { TasksByStatus } from '../types';
import type { Nullable } from 'types/utils';

export const useApi = (setTasksByStatus: Dispatch<SetStateAction<TasksByStatus>>) => {
  const fetchTasks = useCallback(
    async (status: Task['status'], signal?: AbortSignal) => {
      try {
        const requestConfig = taskApiService.findAll({ status }, signal);
        const response = await httpClient<Task[]>(requestConfig);

        setTasksByStatus((prev) => ({
          ...prev,
          [status]: response.data,
        }));
      } catch (error) {
        handleApiError(error);
      }
    },
    [setTasksByStatus],
  );

  const handleReorderTask = useCallback(
    async (
      id: Task['id'],
      status: Task['status'],
      nextTaskId: Nullable<Task['id']>,
    ): Promise<boolean> => {
      try {
        await httpClient(taskApiService.reorder(id, { status, nextTaskId }));
        return true;
      } catch (error) {
        handleApiError(error);
        return false;
      }
    },
    [],
  );

  return { fetchTasks, handleReorderTask };
};
