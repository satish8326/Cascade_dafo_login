import React, { useState, MouseEvent } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleLogout = (): void => {
    logout();
    handleClose();
    navigate('/login', { replace: true });
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          px: 1,
          py: 0.5,
          borderRadius: 999,
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.12)'
          }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="body2"
            sx={{
              color: '#ffffff',
              fontWeight: 500,
              lineHeight: 1.1
            }}
          >
            {user?.name ?? 'User'}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            {user?.organization ?? 'Dafo'}
          </Typography>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          elevation: 6,
          sx: {
            mt: 1.5,
            borderRadius: '10px',
            minWidth: 220,
            px: 1,
            py: 0.5,
            boxShadow: '0px 8px 24px rgba(15, 35, 52, 0.16)',
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: -6,
              right: 28,
              width: 12,
              height: 12,
              backgroundColor: '#ffffff',
              transform: 'rotate(45deg)',
              boxShadow: '0px -2px 4px rgba(15, 35, 52, 0.08)',
              zIndex: -1,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate('/profile');
          }}
          sx={{
            py: 1,
            px: 1.5,
            gap: 1.5,
          }}
        >
          <PersonOutlineOutlinedIcon
            fontSize="small"
            sx={{ color: '#4F5B76' }}
          />
          <Typography
            variant="body2"
            sx={{ fontSize: 14, color: '#182433' }}
          >
            Profile
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate('/reset-password');
          }}
          sx={{
            py: 1,
            px: 1.5,
            gap: 1.5,
          }}
        >
          <LockResetOutlinedIcon
            fontSize="small"
            sx={{ color: '#4F5B76' }}
          />
          <Typography
            variant="body2"
            sx={{ fontSize: 14, color: '#182433' }}
          >
            Reset Password
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate('/admin-settings');
          }}
          sx={{
            py: 1,
            px: 1.5,
            gap: 1.5,
          }}
        >
          <SettingsOutlinedIcon
            fontSize="small"
            sx={{ color: '#4F5B76' }}
          />
          <Typography
            variant="body2"
            sx={{ fontSize: 14, color: '#182433' }}
          >
            Admin Settings
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleLogout();
          }}
          sx={{
            py: 1,
            px: 1.5,
            gap: 1.5,
          }}
        >
          <LogoutOutlinedIcon
            fontSize="small"
            sx={{ color: '#4F5B76' }}
          />
          <Typography
            variant="body2"
            sx={{ fontSize: 14, color: '#182433' }}
          >
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;


