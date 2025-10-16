import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { PriorityFilterOptions, StatusFilterOptions } from './config';
import type { FC } from 'react';
import type { PriorityFilterValues, StatusFilterValues } from '../../../../../../types';

interface Props {
  statusFilter: StatusFilterValues;
  setStatusFilter: (value: StatusFilterValues) => void;
  priorityFilter: PriorityFilterValues;
  setPriorityFilter: (value: PriorityFilterValues) => void;
}

export const FilterControls: FC<Props> = ({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) => {
  return (
    <>
      <Typography sx={{ pt: 1 }}>Filters</Typography>
      <FormControl size="small" fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          label="Status"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {StatusFilterOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" fullWidth>
        <InputLabel>Priority</InputLabel>
        <Select
          value={priorityFilter}
          label="Priority"
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          {PriorityFilterOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
