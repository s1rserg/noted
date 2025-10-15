import AddIcon from '@mui/icons-material/Add';
import { Box, Collapse, IconButton } from '@mui/material';
import { useModal } from 'hooks';
import { AddTaskModal, CollapseHandle, type CreateTaskFormData } from './components';
import { type FC } from 'react';

interface Props {
  open: boolean;
  toggleOpen: () => void;
  onAddTask: (taskData: CreateTaskFormData) => void;
}

export const ControlHeader: FC<Props> = ({ open, toggleOpen, onAddTask }) => {
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
        <Box>
          <IconButton onClick={openModal}>
            <AddIcon />
          </IconButton>
          <AddTaskModal open={isModalOpen} handleClose={closeModal} onSubmit={handleAddTask} />
        </Box>
      </Collapse>

      <CollapseHandle open={open} toggleOpen={toggleOpen} />
    </Box>
  );
};
