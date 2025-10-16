import { Box } from '@mui/material';
import { mockTasks } from './config';
import { processTasks } from './helpers/processTasks';
import { toast } from 'react-toastify';
import { useDebounce, useLocalStorage, useQueryString } from 'hooks';
import { type FC, useCallback, useEffect, useMemo, useState } from 'react';
import { TaskStatus, type Task } from 'types/task';
import { ControlHeader, TaskList, type CreateTaskFormData } from './components';
import {
  FilterSortDefaults,
  ViewMode,
  type PriorityFilterValues,
  type SortByValues,
  type SortOrderValues,
  type StatusFilterValues,
  type ViewModeValues,
  QueryKeys,
} from './types';

const TasksPage: FC = () => {
  const [viewMode, setViewMode] = useLocalStorage<ViewModeValues>('taskViewMode', ViewMode.GRID);

  const [searchQuery, setSearchQuery] = useQueryString<string>(QueryKeys.SEARCH);
  const [sortBy, setSortBy] = useQueryString<SortByValues>(
    QueryKeys.SORT_BY,
    FilterSortDefaults.SORT_BY,
  );
  const [sortOrder, setSortOrder] = useQueryString<SortOrderValues>(
    QueryKeys.SORT_ORDER,
    FilterSortDefaults.SORT_ORDER,
  );
  const [statusFilter, setStatusFilter] = useQueryString<StatusFilterValues>(
    QueryKeys.STATUS,
    FilterSortDefaults.FILTER_ALL,
  );
  const [priorityFilter, setPriorityFilter] = useQueryString<PriorityFilterValues>(
    QueryKeys.PRIORITY,
    FilterSortDefaults.FILTER_ALL,
  );

  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);

  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedSearchQuery = useDebounce(inputValue, 500);

  const processedTasks = useMemo(
    () =>
      processTasks({
        tasks,
        searchQuery,
        sortBy,
        sortOrder,
        statusFilter,
        priorityFilter,
      }),
    [tasks, searchQuery, sortBy, sortOrder, statusFilter, priorityFilter],
  );

  const handleCompleteTask = useCallback((id: Task['id']) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, status: TaskStatus.COMPLETED } : task)),
    );
    toast.success('Task was completed successfully.');
  }, []);

  const handleDeleteTask = useCallback((id: Task['id']) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success('Task was deleted successfully.');
  }, []);

  const handleToggleHeader = () => {
    setIsHeaderOpen((prev) => !prev);
  };

  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === ViewMode.GRID ? ViewMode.LIST : ViewMode.GRID));
  };

  const handleAddTask = (taskData: CreateTaskFormData) => {
    const newTask = {
      ...taskData,
      id: new Date().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      setSearchQuery(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, setSearchQuery, searchQuery]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
      <ControlHeader
        open={isHeaderOpen}
        toggleOpen={handleToggleHeader}
        onAddTask={handleAddTask}
        viewMode={viewMode}
        toggleViewMode={handleToggleViewMode}
        searchQuery={inputValue}
        onSearchChange={setInputValue}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />
      <TaskList
        tasks={processedTasks}
        viewMode={viewMode}
        onCompleteTask={handleCompleteTask}
        onDeleteTask={handleDeleteTask}
      />
    </Box>
  );
};

export default TasksPage;
