import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  styled,
} from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import BRALOGO from './../assets/BRA logo.svg';

const CustomAppBar = styled(AppBar)({
  boxShadow: 'none',
});

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <CustomAppBar position="static" color="inherit">
      <Toolbar>
        <img src={BRALOGO} alt="BRA" style={{ height: 40, marginRight: 16 }} />
        <div style={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <div>
          <IconButton onClick={handleMenuOpen}>
            <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </CustomAppBar>
  );
}
