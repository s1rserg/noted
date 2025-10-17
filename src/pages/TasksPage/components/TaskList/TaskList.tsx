import { Box } from '@mui/material';
import { CommonModal } from 'components/CommonModal';
import { GridView, GridViewSkeleton, ListView, ListViewSkeleton } from './components';
import { TaskCard } from '../TaskCard';
import { useModal } from 'hooks';
import { memo, useState, type FC, type ReactNode } from 'react';
import type { ViewModeValues } from '../../types';
import type { Task } from 'types/task';
import type { Nullable } from 'types/utils';

interface TaskListProps {
  tasks: Task[];
  viewMode: ViewModeValues;
  onCompleteTask: (id: Task['id']) => void;
  onDeleteTask: (id: Task['id']) => void;
  isLoading: boolean;
}

export const TaskList: FC<TaskListProps> = memo(
  ({ tasks, viewMode, onCompleteTask, onDeleteTask, isLoading }) => {
    const {
      isOpen: isTaskItemModalOpen,
      openModal: openTaskItemModal,
      closeModal: closeTaskItemModal,
    } = useModal();

    const [selectedTaskId, setSelectedTaskId] = useState<Nullable<Task['id']>>(null);

    const selectedTask = tasks.find((task) => task.id === selectedTaskId);

    const handleTaskItemClick = (id: Task['id']) => {
      setSelectedTaskId(id);
      openTaskItemModal();
    };

    const viewMap: Record<ViewModeValues, ReactNode> = {
      grid: isLoading ? (
        <GridViewSkeleton />
      ) : (
        <GridView tasks={tasks} onCompleteTask={onCompleteTask} onDeleteTask={onDeleteTask} />
      ),
      list: isLoading ? (
        <ListViewSkeleton />
      ) : (
        <ListView tasks={tasks} onTaskClick={handleTaskItemClick} />
      ),
    };

    if (tasks.length === 0) {
      return <Box sx={{ textAlign: 'center', p: 4 }}>There are no tasks to show.</Box>;
    }

    return (
      <Box>
        {viewMap[viewMode]}
        {selectedTask && (
          <CommonModal
            open={isTaskItemModalOpen}
            handleClose={closeTaskItemModal}
            title="Task Details"
          >
            <TaskCard task={selectedTask} onComplete={onCompleteTask} onDelete={onDeleteTask} />
          </CommonModal>
        )}
      </Box>
    );
  },
);
