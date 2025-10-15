import AddIcon from '@mui/icons-material/Add';
import { Box, Collapse, IconButton } from '@mui/material';
import { AddTaskModal, CollapseHandle, type CreateTaskFormData } from './components';
import { useState, type FC } from 'react';

interface Props {
  open: boolean;
  toggleOpen: () => void;
  onAddTask: (taskData: CreateTaskFormData) => void;
}

export const ControlHeader: FC<Props> = ({ open, toggleOpen, onAddTask }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);

  const handleAddTask = (taskData: CreateTaskFormData) => {
    onAddTask(taskData);
    handleModalClose();
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
          <IconButton onClick={handleModalOpen}>
            <AddIcon />
          </IconButton>
          <AddTaskModal
            open={isModalOpen}
            handleClose={handleModalClose}
            onSubmit={handleAddTask}
          />
        </Box>
      </Collapse>

      <CollapseHandle open={open} toggleOpen={toggleOpen} />
    </Box>
  );
};
