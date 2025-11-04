import { Grid } from '@mui/material';
import { useEffect, useState, type FC } from 'react';
import { initialTasks, TaskStatusValues } from './config';
import { Column, Item } from './components';
import { useTranslation } from 'react-i18next';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useApi, useDndSensors, useKanbanDnd } from './hooks';
import { createPortal } from 'react-dom';
import { Loader } from 'components/Loader';

export const KanbanPage: FC = () => {
  const { t } = useTranslation('kanbanPage');

  const sensors = useDndSensors();

  const [tasks, setTasks] = useState(initialTasks);
  const [isLoading, setIsLoading] = useState(true);

  const { fetchTasks, handleReorderTask } = useApi(setTasks);

  const { activeTask, handleDragStart, handleDragOver, handleDragEnd } = useKanbanDnd(
    tasks,
    setTasks,
    handleReorderTask,
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadAllTasks = async () => {
      setIsLoading(true);

      const fetchPromises = TaskStatusValues.map(async (status) => fetchTasks(status, signal));
      await Promise.all(fetchPromises);
      if (!signal.aborted) {
        setIsLoading(false);
      }
    };

    void loadAllTasks();

    return () => controller.abort();
  }, [fetchTasks]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={(e) => void handleDragEnd(e)}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <Grid container spacing={4} justifyContent="center" pt={2}>
        {TaskStatusValues.map((status) => (
          <Grid key={status} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Column id={status} title={t(`columnLabels.${status}`)} tasks={tasks[status] || []} />
          </Grid>
        ))}
      </Grid>
      {createPortal(
        <DragOverlay>{activeTask ? <Item task={activeTask} /> : null}</DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};
