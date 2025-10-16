import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { SortOptions } from './config';
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
} from '@mui/material';
import { SortOrder, type SortByValues, type SortOrderValues } from 'pages/TasksPage/types';
import type { FC } from 'react';

interface Props {
  sortBy: SortByValues;
  setSortBy: (value: SortByValues) => void;
  sortOrder: SortOrderValues;
  setSortOrder: (value: SortOrderValues) => void;
}

export const SortControls: FC<Props> = ({ sortBy, setSortBy, sortOrder, setSortOrder }) => {
  const isAscSortOrder = sortOrder === SortOrder.ASC;

  return (
    <>
      <Typography variant="subtitle1">Sorting</Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <FormControl size="small" fullWidth>
          <InputLabel>Field</InputLabel>
          <Select
            value={sortBy}
            label="Field"
            onChange={(e) => setSortBy(e.target.value as SortByValues)}
          >
            {SortOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip title={isAscSortOrder ? 'Ascending' : 'Descending'}>
          <IconButton onClick={() => setSortOrder(isAscSortOrder ? SortOrder.DESC : SortOrder.ASC)}>
            {isAscSortOrder ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};
