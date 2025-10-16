import { Box, Collapse } from '@mui/material';
import { useModal } from 'hooks';
import {
  AddTaskButton,
  AddTaskModal,
  CollapseHandle,
  ViewModeSwitch,
  type CreateTaskFormData,
} from './components';
import { type FC } from 'react';
import type { ViewModeValues } from '../../types';

interface Props {
  open: boolean;
  toggleOpen: () => void;
  onAddTask: (taskData: CreateTaskFormData) => void;
  viewMode: ViewModeValues;
  toggleViewMode: () => void;
}

export const ControlHeader: FC<Props> = ({
  open,
  toggleOpen,
  onAddTask,
  viewMode,
  toggleViewMode,
}) => {
  const { isOpen: isModalOpen, openModal: openModal, closeModal: closeModal } = useModal();

  const handleAddTask = (taskData: CreateTaskFormData) => {
    onAddTask(taskData);
    closeModal();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        mt: 2,
      }}
    >
      <Collapse in={open} timeout={300}>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <ViewModeSwitch viewMode={viewMode} onToggle={toggleViewMode} />
          <AddTaskButton openModal={openModal} />
          <AddTaskModal open={isModalOpen} handleClose={closeModal} onSubmit={handleAddTask} />
        </Box>
      </Collapse>

      <CollapseHandle open={open} toggleOpen={toggleOpen} />
    </Box>
  );
};
