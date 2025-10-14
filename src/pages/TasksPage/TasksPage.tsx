import { Box } from '@mui/material';
import { ControlHeader } from './components/ControlHeader';
import { type FC, useState } from 'react';

const TasksPage: FC = () => {
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  const handleToggleHeader = () => {
    setIsHeaderOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <ControlHeader open={isHeaderOpen} toggleOpen={handleToggleHeader} />
    </Box>
  );
};

export default TasksPage;
