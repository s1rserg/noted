import { useState, type Dispatch, type SetStateAction } from 'react';
import type { Task } from 'types/task';
import type { Nullable } from 'types/utils';
import { arrayMove } from '@dnd-kit/sortable';
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core';
import type { TasksByStatus } from '../types';

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

  const findTaskStatus = (taskId: string, taskSet: TasksByStatus): Task['status'] | undefined => {
    const statuses = Object.keys(taskSet) as Array<Task['status']>;
    return statuses.find((status) => (taskSet[status] ?? []).some((task) => task.id === taskId));
  };

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

    setTasks((prev) => {
      const task = prev[fromStatus]?.find((t) => t.id === activeId);
      if (!task) return prev;

      const fromItems = (prev[fromStatus] ?? []).filter((t) => t.id !== activeId);
      const toItems = prev[toStatus] ?? [];

      const overTaskIndex = toItems.findIndex((t) => t.id === overId);

      let newIndex: number;
      if (overTaskIndex !== -1) {
        newIndex = overTaskIndex;
      } else {
        newIndex = toItems.length;
      }

      const newToItems = [
        ...toItems.slice(0, newIndex),
        { ...task, status: toStatus },
        ...toItems.slice(newIndex),
      ];

      return {
        ...prev,
        [fromStatus]: fromItems,
        [toStatus]: newToItems,
      };
    });
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = active.id as string;
    const overId = over?.id as string;

    const fromStatus = originalTasks ? findTaskStatus(activeId, originalTasks) : null;

    const toStatus = findTaskStatus(activeId, tasks);

    setActiveTask(null);
    setOriginalTasks(null);

    if (!over || !fromStatus || !toStatus || !originalTasks) {
      if (originalTasks) setTasks(originalTasks);
      return;
    }

    let nextTaskId: Nullable<string> = null;

    if (fromStatus === toStatus) {
      const items = tasks[fromStatus] ?? [];
      const oldIdx = items.findIndex((t) => t.id === activeId);
      const newIdx = items.findIndex((t) => t.id === overId);

      if (oldIdx === newIdx) return;

      const reorderedItems = arrayMove(items, oldIdx, newIdx);

      setTasks((prev) => ({ ...prev, [fromStatus]: reorderedItems }));

      nextTaskId = reorderedItems[newIdx + 1]?.id ?? null;
    } else {
      const toItems = tasks[toStatus] ?? [];
      const activeTaskIndex = toItems.findIndex((t) => t.id === activeId);
      nextTaskId = toItems[activeTaskIndex + 1]?.id ?? null;
    }

    const ok = await handleReorderTask(activeId, toStatus, nextTaskId);

    if (!ok) setTasks(originalTasks);
  };

  return { activeTask, handleDragStart, handleDragOver, handleDragEnd };
};
