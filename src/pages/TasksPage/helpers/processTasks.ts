import { OrderMap } from '../config';
import { SortOrder } from '../types';
import type { Task } from 'types/task';

interface ProcessParams {
  tasks: Task[];
  searchQuery: string;
  sortBy: string;
  sortOrder: string;
  statusFilter: string;
  priorityFilter: string;
}

export const processTasks = ({
  tasks,
  searchQuery,
  sortBy,
  sortOrder,
  statusFilter,
  priorityFilter,
}: ProcessParams): Task[] => {
  let result = [...tasks];

  result = result.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  result.sort((a, b) => {
    const order = sortOrder === SortOrder.ASC ? 1 : -1;

    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title) * order;

      case 'status':
        return (OrderMap.status[a.status] - OrderMap.status[b.status]) * order;

      case 'priority':
        return (OrderMap.priority[a.priority] - OrderMap.priority[b.priority]) * order;

      case 'createdAt':
      default:
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * order;
    }
  });

  return result;
};
