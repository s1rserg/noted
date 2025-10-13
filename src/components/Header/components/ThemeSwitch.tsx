import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, Tooltip, useColorScheme } from '@mui/material';
import type { FC } from 'react';

export const ThemeSwitch: FC = () => {
  const { mode, setMode } = useColorScheme();

  const isDark = mode === 'dark';

  return (
    <Tooltip title="theme">
      <IconButton onClick={() => setMode(isDark ? 'light' : 'dark')}>
        {isDark ? <LightModeIcon /> : <DarkModeIcon color="action" />}
      </IconButton>
    </Tooltip>
  );
};
