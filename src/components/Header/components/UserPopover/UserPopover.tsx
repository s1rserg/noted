import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Popover,
  Tooltip,
  Stack,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { useState, type FC, type MouseEvent } from 'react';
import type { Nullable } from 'types/utils';
import { useUserStore } from 'store';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'routes';

export const UserPopover: FC = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);

  if (!user) return null;

  const open = Boolean(anchorEl);

  const emptyProfile = user && !user.name;

  const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    handleClose();
    await logout();
    void navigate(AppRoutes.LOGIN, { replace: true });
  };

  const handleClickUpdateProfile = () => {
    handleClose();
    void navigate(AppRoutes.PROFILE);
  };
  return (
    <>
      <Tooltip title="Profile">
        <span>
          <IconButton onClick={handleClick} disabled={!user}>
            <Badge variant="dot" color="error" overlap="circular" invisible={!emptyProfile}>
              <Avatar />
            </Badge>
          </IconButton>
        </span>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2, width: 280 }}>
          {user && (
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle1" component="p">
                  Hello, {user.name || user.email}
                </Typography>

                {emptyProfile && (
                  <Typography variant="subtitle1" component="p">
                    Please, update your profile.
                  </Typography>
                )}
              </Box>

              <Divider />

              <Button variant="outlined" fullWidth onClick={handleClickUpdateProfile}>
                Update Profile
              </Button>

              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => void handleLogout()}
              >
                Logout
              </Button>
            </Stack>
          )}
        </Box>
      </Popover>
    </>
  );
};
