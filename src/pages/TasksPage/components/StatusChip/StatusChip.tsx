import { Chip } from '@mui/material';
import { StatusIcons, StatusStyles } from './styles';
import { TaskStatusLabels, type TaskStatusValues } from 'types/task';
import type { FC } from 'react';

interface Props {
  status: TaskStatusValues;
}

export const StatusChip: FC<Props> = ({ status }) => {
  const StatusIcon = StatusIcons[status];
  const style = StatusStyles[status];
  const label = TaskStatusLabels[status];

  return (
    <Chip icon={<StatusIcon sx={{ '&&': { color: style.color } }} />} label={label} sx={style} />
  );
};
