import { Box, Divider } from '@mui/material';
import { Logo, ThemeSwitch } from './components';
import type { FC } from 'react';

export const Header: FC = () => {
  return (
    <Box component="header">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Logo />
        <ThemeSwitch />
      </Box>

      <Divider />
    </Box>
  );
};
