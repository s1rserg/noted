import type { ViewMode } from '../../types';
import type { Task } from 'types/task';

export interface TaskListProps {
  tasks: Task[];
  mode: ViewMode;
  isLoading: boolean;
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}
