import { useState } from 'react';
import {
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { logout } from '@/features/auth/authSlice';

export default function UserProfileBadge() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  };

  const label = currentUser
    ? `${currentUser.fullName} (${currentUser.role === 'WING_UTM' ? 'Wing UTM' : 'UTM'})`
    : 'UTM Admin';

  return (
    <>
      <Chip
        icon={<PersonIcon sx={{ fontSize: 16 }} />}
        label={label}
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleClick}
        sx={{ fontWeight: 600, cursor: 'pointer' }}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 4,
          sx: { minWidth: 200, borderRadius: 2, mt: 1 },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {currentUser?.fullName || 'Administrator'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {currentUser?.email || 'admin@test.com'}
          </Typography>
        </Box>

        <Divider />

        <MenuItem onClick={handleLogout} sx={{ color: 'error.main', py: 1 }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Log Out" primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
