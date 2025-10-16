import { Box, Collapse } from '@mui/material';
import { useModal } from 'hooks';
import {
  AddTaskButton,
  AddTaskModal,
  CollapseHandle,
  SearchInput,
  ViewModeSwitch,
  FilterSortControls,
  type CreateTaskFormData,
} from './components';
import { type FC } from 'react';
import type {
  PriorityFilterValues,
  SortByValues,
  SortOrderValues,
  StatusFilterValues,
  ViewModeValues,
} from '../../types';

interface Props {
  open: boolean;
  toggleOpen: () => void;
  onAddTask: (taskData: CreateTaskFormData) => void;
  viewMode: ViewModeValues;
  toggleViewMode: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortByValues;
  setSortBy: (value: SortByValues) => void;
  sortOrder: SortOrderValues;
  setSortOrder: (value: SortOrderValues) => void;
  statusFilter: StatusFilterValues;
  setStatusFilter: (value: StatusFilterValues) => void;
  priorityFilter: PriorityFilterValues;
  setPriorityFilter: (value: PriorityFilterValues) => void;
}

export const ControlHeader: FC<Props> = (props) => {
  const { open, toggleOpen, onAddTask, viewMode, toggleViewMode, ...rest } = props;
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();

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
      <Collapse in={open} timeout={300} sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <SearchInput searchQuery={rest.searchQuery} onSearchChange={rest.onSearchChange} />
          <FilterSortControls {...rest} />
          <ViewModeSwitch viewMode={viewMode} onToggle={toggleViewMode} />
          <AddTaskButton openModal={openModal} />
          <AddTaskModal open={isModalOpen} handleClose={closeModal} onSubmit={handleAddTask} />
        </Box>
      </Collapse>
      <CollapseHandle open={open} toggleOpen={toggleOpen} />
    </Box>
  );
};
