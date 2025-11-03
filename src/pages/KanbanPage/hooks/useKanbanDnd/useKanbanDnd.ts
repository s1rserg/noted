import { useState, type Dispatch, type SetStateAction } from 'react';
import type { Task } from 'types/task';
import type { Nullable } from 'types/utils';
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core';
import type { TasksByStatus } from '../../types';
import {
  findTaskStatus,
  getNextTaskId,
  moveTaskBetweenColumns,
  reorderTaskInColumn,
} from './helpers';

export const useKanbanDnd = (
  tasks: TasksByStatus,
  setTasks: Dispatch<SetStateAction<TasksByStatus>>,
  handleReorderTask: (
    id: Task['id'],
    status: Task['status'],
    nextTaskId: Nullable<Task['id']>,
  ) => Promise<boolean>,
) => {
  const [activeTask, setActiveTask] = useState<Nullable<Task>>(null);
  const [originalTasks, setOriginalTasks] = useState<Nullable<TasksByStatus>>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { activeItem } = event.active.data.current as { activeItem: Task };
    setActiveTask(activeItem);
    setOriginalTasks(tasks);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;

    const fromStatus = findTaskStatus(activeId, tasks);

    const toStatus =
      (over.data.current?.columnId as Task['status']) ?? findTaskStatus(overId, tasks);

    if (!fromStatus || !toStatus || fromStatus === toStatus) return;

    setTasks((prev) => moveTaskBetweenColumns({ prev, activeId, fromStatus, toStatus, overId }));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = active.id as string;
    const overId = over?.id as string;

    const fromStatus = originalTasks ? findTaskStatus(activeId, originalTasks) : null;

    const toStatus = findTaskStatus(activeId, tasks);

    setActiveTask(null);
    setOriginalTasks(null);

    if (!originalTasks) return;

    if (!over || !fromStatus || !toStatus) {
      setTasks(originalTasks);
      return;
    }

    let nextTaskId: Nullable<string> = null;

    if (fromStatus === toStatus) {
      const result = reorderTaskInColumn(tasks, fromStatus, activeId, overId);

      if (!result) return;

      setTasks(result.reorderedTasks);
      nextTaskId = result.nextTaskId;
    } else {
      nextTaskId = getNextTaskId(tasks, toStatus, activeId);
    }

    const ok = await handleReorderTask(activeId, toStatus, nextTaskId);

    if (!ok) setTasks(originalTasks);
  };

  return { activeTask, handleDragStart, handleDragOver, handleDragEnd };
};
