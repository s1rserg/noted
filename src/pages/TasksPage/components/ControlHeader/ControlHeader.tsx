import AddIcon from '@mui/icons-material/Add';
import { AddTaskModal } from './components';
import { Box, Collapse, IconButton, Typography } from '@mui/material';
import { TaskPriority, TaskStatus } from 'types/task';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type FC } from 'react';
import { CreateTaskSchema, type CreateTaskFormData } from './types';

interface Props {
  open: boolean;
  toggleOpen: () => void;
}

export const ControlHeader: FC<Props> = ({ open, toggleOpen }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      deadline: '',
      status: TaskStatus.PENDING,
      priority: TaskPriority.MEDIUM,
      tags: [],
    },
    reValidateMode: 'onSubmit',
  });

  const handleFormSubmit = handleSubmit((data) => {
    // eslint-disable-next-line no-console
    console.log('Submitted task:', data);
    reset();
    handleModalClose();
  });

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
            onSubmit={handleFormSubmit}
            control={control}
            errors={errors}
            clearErrors={clearErrors}
          />
        </Box>
      </Collapse>

      <Box
        onClick={toggleOpen}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          height: 6,
          transition: 'all 0.3s ease',
          '&::before, &::after': {
            content: '""',
            flex: 1,
            height: 1,
            bgcolor: 'primary.light',
          },
          '&:hover::before, &:hover::after': {
            bgcolor: 'primary.main',
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            mx: 1,
            fontSize: 14,
          }}
        >
          {open ? 'Hide controls' : 'Show controls'}
        </Typography>
      </Box>
    </Box>
  );
};
