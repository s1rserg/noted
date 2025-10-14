import { CheckCircle, Circle, RadioButtonUnchecked } from '@mui/icons-material';
import { TaskStatus, type TaskStatusValues } from 'types/task';

export type ChipStyle = {
  backgroundColor: string;
  color: string;
};

export const StatusStyles: Record<TaskStatusValues, ChipStyle> = {
  [TaskStatus.PENDING]: {
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
  },
  [TaskStatus.IN_PROGRESS]: {
    backgroundColor: 'info.main',
    color: 'info.contrastText',
  },
  [TaskStatus.COMPLETED]: {
    backgroundColor: '#5dd55d',
    color: 'success.contrastText',
  },
};

export const StatusIcons: Record<TaskStatusValues, React.ElementType> = {
  [TaskStatus.PENDING]: RadioButtonUnchecked,
  [TaskStatus.IN_PROGRESS]: Circle,
  [TaskStatus.COMPLETED]: CheckCircle,
};
