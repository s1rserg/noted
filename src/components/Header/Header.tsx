import { Box, Divider, Link } from '@mui/material';
import { Logo, ThemeSwitch } from './components';

import { AppRoutes } from 'routes';
import type { FC } from 'react';

export const Header: FC = () => {
  return (
    <Box component="header">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Logo />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link href={AppRoutes.REGISTER}>Test Register</Link>
          <ThemeSwitch />
        </Box>
      </Box>

      <Divider />
    </Box>
  );
};
