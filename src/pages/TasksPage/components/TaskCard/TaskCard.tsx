import { AccountCircle, CheckCircle, Delete, Edit, Info } from '@mui/icons-material';
import { AppRoutes } from 'routes/config';
import { ButtonsStyles, DescriptionStyles, PriorityStyles } from './styles';
import { ConfirmModal } from 'components/ConfirmModal';
import { generatePath, useNavigate } from 'react-router-dom';
import { StatusChip } from '../StatusChip';
import { TaskPriorityLabels } from '../../config';
import { useModal } from 'hooks';
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { type FC } from 'react';
import { TaskStatus, type Task } from 'types/task';

interface Props {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: FC<Props> = ({ task, onComplete, onDelete }) => {
  const navigate = useNavigate();

  const {
    isOpen: isCompleteModalOpen,
    openModal: openCompleteModal,
    closeModal: closeCompleteModal,
  } = useModal();

  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const isCompleted = task.status === TaskStatus.COMPLETED;

  const handleEdit = (id: string) => {
    void navigate(generatePath(AppRoutes.EDIT_TASK, { id }));
  };

  const handleDetails = (id: string) => {
    void navigate(generatePath(AppRoutes.TASK_DETAILS, { id }));
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <AccountCircle />
          <Typography variant="h5">{task.title}</Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={DescriptionStyles}>
          {task.description}
        </Typography>

        <Stack direction="row" spacing={1}>
          <StatusChip status={task.status} />
          <Chip label={TaskPriorityLabels[task.priority]} sx={PriorityStyles[task.priority]} />
          {task.deadline && <Chip label={task.deadline} />}
        </Stack>
        <Stack direction="row" spacing={1} mt={1}>
          {task.tags?.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </Stack>
      </CardContent>

      <Box sx={ButtonsStyles}>
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEdit(task.id)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Details">
          <IconButton onClick={() => handleDetails(task.id)}>
            <Info />
          </IconButton>
        </Tooltip>
        <Tooltip title="Complete">
          <span>
            <IconButton onClick={openCompleteModal} disabled={isCompleted}>
              <CheckCircle />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={openDeleteModal}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      <ConfirmModal
        open={isCompleteModalOpen}
        handleClose={closeCompleteModal}
        onConfirm={() => onComplete(task.id)}
        title="Confirm Completion"
        confirmText="Yes, Complete"
        cancelText="Cancel"
      >
        Are you sure you want to mark this task as complete?
      </ConfirmModal>
      <ConfirmModal
        open={isDeleteModalOpen}
        handleClose={closeDeleteModal}
        onConfirm={() => onDelete(task.id)}
        title="Confirm Deletion"
        confirmText="Yes, Delete"
        cancelText="No, Keep It"
      >
        Are you sure you want to delete this item? This action cannot be undone.
      </ConfirmModal>
    </Card>
  );
};
