import { Box, Collapse } from '@mui/material';
import { useDebounce, useModal, useQueryString } from 'hooks';
import {
  AddTaskButton,
  AddTaskModal,
  CollapseHandle,
  SearchInput,
  ViewModeSwitch,
  FilterSortControls,
} from './components';
import { useEffect, useState, type FC } from 'react';
import {
  FilterSortDefaults,
  QueryKeys,
  type SortByValues,
  type SortOrderValues,
  type ViewModeValues,
} from '../../types';
import type { StatusFilterValues, PriorityFilterValues, CreateTaskDto } from 'api';

interface Props {
  open: boolean;
  toggleOpen: () => void;
  onAddTask: (taskData: CreateTaskDto) => Promise<boolean>;
  viewMode: ViewModeValues;
  toggleViewMode: () => void;
}

export const ControlHeader: FC<Props> = ({
  open,
  toggleOpen,
  onAddTask,
  viewMode,
  toggleViewMode,
}) => {
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();

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

  const [isAddLoading, setisAddLoading] = useState(false);

  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedSearchQuery = useDebounce(inputValue, 500);

  const handleAddTask = async (taskData: CreateTaskDto) => {
    setisAddLoading(true);
    try {
      if (await onAddTask(taskData)) {
        closeModal();
      }
    } finally {
      setisAddLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      setSearchQuery(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, setSearchQuery, searchQuery]);

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
          <SearchInput searchQuery={inputValue} onSearchChange={setInputValue} />
          <FilterSortControls
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />
          <ViewModeSwitch viewMode={viewMode} onToggle={toggleViewMode} />
          <AddTaskButton openModal={openModal} />
          <AddTaskModal
            open={isModalOpen}
            handleClose={closeModal}
            onSubmit={handleAddTask}
            isLoading={isAddLoading}
          />
        </Box>
      </Collapse>
      <CollapseHandle open={open} toggleOpen={toggleOpen} />
    </Box>
  );
};
