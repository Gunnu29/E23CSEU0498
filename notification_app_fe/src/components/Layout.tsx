import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import TerminalIcon from '@mui/icons-material/Terminal';

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: '#0a1929', borderBottom: '1px solid #1e4976' }}>
        <Toolbar>
          <TerminalIcon sx={{ mr: 2, color: '#90caf9' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: '0.1rem' }}>
            ~/campus-sys/notifications
          </Typography>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
            sx={{ 
              color: location.pathname === '/' ? '#90caf9' : '#a0aec0',
              borderBottom: location.pathname === '/' ? '2px solid #90caf9' : '2px solid transparent', 
              borderRadius: 0, 
              mx: 1,
              '&:hover': { color: '#ffffff' }
            }}
          >
            ./all
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/priority"
            sx={{ 
              color: location.pathname === '/priority' ? '#90caf9' : '#a0aec0',
              borderBottom: location.pathname === '/priority' ? '2px solid #90caf9' : '2px solid transparent', 
              borderRadius: 0, 
              mx: 1,
              '&:hover': { color: '#ffffff' }
            }}
          >
            ./priority
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, pt: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
