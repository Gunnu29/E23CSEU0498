import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <AppBar position="static">
        <Toolbar>
          <NotificationsActiveIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Campus Notifications
          </Typography>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
            sx={{ borderBottom: location.pathname === '/' ? '2px solid white' : 'none', borderRadius: 0, mx: 1 }}
          >
            All Notifications
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/priority"
            sx={{ borderBottom: location.pathname === '/priority' ? '2px solid white' : 'none', borderRadius: 0, mx: 1 }}
          >
            Priority Inbox
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
