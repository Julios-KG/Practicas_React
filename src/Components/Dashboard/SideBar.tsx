// src/Components/Dashboard/Sidebar.js
import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sidebar = () => {
  return (
    <Box sx={{ width: 260, bgcolor: '#000', height: '100vh', position: 'fixed', borderRadius:"20px", overflow:"hidden", boxShadow:3}}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar src="/path-to-avatar.jpg" alt="Osmar Casillas" />
        <Box sx={{ ml: 2 }}>
          <div style={{color:"#fff"}}>Osmar Casillas</div>
          <div style={{color:"#fff"}}>ocasillas@gmail.com</div>
        </Box>
      </Box>
      <List>
        <ListItem button>
          <ListItemIcon style={{color:"#fff"}}><DashboardIcon /></ListItemIcon>
          <ListItemText style={{color:"#fff"}} primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon style={{color:"#fff"}}><MessageIcon /></ListItemIcon>
          <ListItemText style={{color:"#fff"}} primary="Mensajes" />
        </ListItem>
        <ListItem button>
          <ListItemIcon style={{color:"#fff"}}><WalletIcon /></ListItemIcon>
          <ListItemText style={{color:"#fff"}} primary="Mi cartera" />
        </ListItem>
        <ListItem button>
          <ListItemIcon style={{color:"#fff"}}><HistoryIcon /></ListItemIcon>
          <ListItemText style={{color:"#fff"}} primary="Histórico" />
        </ListItem>
        <ListItem button>
          <ListItemIcon style={{color:"#fff"}}><SettingsIcon /></ListItemIcon>
          <ListItemText style={{color:"#fff"}} primary="Configuración" />
        </ListItem>
        <ListItem button>
          <ListItemIcon style={{color:"#fff"}}><HelpIcon /></ListItemIcon>
          <ListItemText style={{color:"#fff"}} primary="Ayuda" />
        </ListItem>
        <ListItem button>
          <ListItemIcon style={{color:"#fff"}}><ExitToAppIcon /></ListItemIcon>
          <ListItemText style={{color:"#fff"}} primary="Cerrar sesión" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
