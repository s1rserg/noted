import { Box, Typography } from '@mui/material';
import type { FC } from 'react';

interface Props {
  open: boolean;
  toggleOpen: () => void;
}

export const CollapseHandle: FC<Props> = ({ open, toggleOpen }) => {
  return (
    <Box
      onClick={toggleOpen}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        height: 6,
        transition: 'all 0.3s ease',
        '&::before, &::after': {
          content: '""',
          flex: 1,
          height: 1,
          bgcolor: 'primary.light',
        },
        '&:hover::before, &:hover::after': {
          bgcolor: 'primary.main',
        },
      }}
    >
      <Typography
        variant="caption"
        sx={{
          mx: 1,
          fontSize: 14,
        }}
      >
        {open ? 'Hide controls' : 'Show controls'}
      </Typography>
    </Box>
  );
};
