import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import type { FC } from 'react';

interface Props {
  openModal: () => void;
}

export const AddTaskButton: FC<Props> = ({ openModal }) => {
  return (
    <Tooltip title="Add new task">
      <IconButton onClick={openModal} color="primary">
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
};
