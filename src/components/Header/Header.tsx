import { Box, Typography } from '@mui/material';
import { ThemeSwitch } from './components/ThemeSwitch/ThemeSwitch';
import type { FC } from 'react';

export const Header: FC = () => {
  return (
    <Box component="header" sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
      <Typography>noted</Typography>
      <ThemeSwitch />
    </Box>
  );
};
