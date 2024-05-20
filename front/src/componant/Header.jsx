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
        <a href="http://localhost:3006/auth">
          <img
            src={BRALOGO}
            alt="BRA"
            style={{ height: 40, marginRight: 16 }}
          />
        </a>
        <div style={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <div>
          <IconButton onClick={handleMenuOpen}>
            <Avatar src="data:image/jpeg;base64,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" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Déconnecter</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </CustomAppBar>
  );
}
