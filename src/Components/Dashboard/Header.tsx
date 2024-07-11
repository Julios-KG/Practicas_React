// src/Components/Dashboard/Header.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';

const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: 'background.paper', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ position: 'relative', borderRadius: 1, bgcolor: '#f1f1f1', marginLeft: 2, width: '100%' }}>
            <Box sx={{ padding: '0 10px', height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'search' }}
              sx={{ color: 'inherit', paddingLeft: `calc(1em + ${20}px)`, width: '100%' }}
            />
          </Box>
        </Box>
        <IconButton size="large" edge="end" color="primary" aria-label="menu" >
          <NotificationsIcon />
        </IconButton>
        <Avatar alt="Osmar Casillas" src="/path-to-avatar.jpg" />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
