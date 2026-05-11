import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: '#ffffff', borderBottom: '1px solid #eaeaea' }}>
        <Toolbar>
          <NotificationsNoneIcon sx={{ mr: 2, color: '#111111' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: '#111111', letterSpacing: '-0.02em' }}>
            Notifications
          </Typography>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
            sx={{ 
              color: location.pathname === '/' ? '#111111' : '#888888',
              borderBottom: location.pathname === '/' ? '2px solid #111111' : '2px solid transparent', 
              borderRadius: 0, 
              mx: 2,
              pb: 0.5,
              '&:hover': { color: '#111111', backgroundColor: 'transparent' }
            }}
          >
            All
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/priority"
            sx={{ 
              color: location.pathname === '/priority' ? '#111111' : '#888888',
              borderBottom: location.pathname === '/priority' ? '2px solid #111111' : '2px solid transparent', 
              borderRadius: 0, 
              mx: 2,
              pb: 0.5,
              '&:hover': { color: '#111111', backgroundColor: 'transparent' }
            }}
          >
            Priority
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, pt: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
