import { Box, Divider, Typography } from '@mui/material';
import type { FC } from 'react';
import type { Task } from 'types/task';
import { Item } from '../Item';
import { SortableContext } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { SortableItem } from './components';

interface Props {
  id: string;
  title: string;
  tasks: Task[];
}

export const Column: FC<Props> = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: id,
    data: { columnId: id },
  });

  const taskIds = tasks.map((task) => task.id);

  return (
    <Box
      ref={setNodeRef}
      sx={{
        minwidth: 300,
        minHeight: '80dvh',
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        m: 'auto',
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <SortableItem
              key={task.id}
              id={task.id}
              activeItem={task}
              render={(sortActivatorProps) => (
                <Item task={task} sortActivatorProps={sortActivatorProps} />
              )}
            />
          ))}
        </SortableContext>
      </Box>
    </Box>
  );
};
