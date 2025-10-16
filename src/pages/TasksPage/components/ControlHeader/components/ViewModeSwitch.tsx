import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { IconButton, Tooltip } from '@mui/material';
import { ViewMode, type ViewModeValues } from '../../../types';
import type { FC } from 'react';

interface Props {
  viewMode: ViewModeValues;
  onToggle: () => void;
}

export const ViewModeSwitch: FC<Props> = ({ viewMode, onToggle }) => {
  return (
    <Tooltip title={`Switch to ${viewMode === ViewMode.GRID ? ViewMode.LIST : ViewMode.GRID} view`}>
      <IconButton onClick={onToggle} color="primary" size="large">
        {viewMode === ViewMode.GRID ? <ViewListIcon /> : <GridViewIcon />}
      </IconButton>
    </Tooltip>
  );
};
