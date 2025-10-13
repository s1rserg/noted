import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: 'primary.main',
        textDecoration: 'none',
        gap: 0.6,
      }}
    >
      <TextSnippetIcon fontSize="large" />
      <Typography variant="h3" sx={{ fontWeight: 600 }}>
        noted
      </Typography>
    </Box>
  );
}
