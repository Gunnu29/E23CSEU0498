import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import type { Notification } from '../api';
import InfoIcon from '@mui/icons-material/Info';
import EventIcon from '@mui/icons-material/Event';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Props {
  notification: Notification;
  isViewed: boolean;
  onView: (id: string) => void;
}

const getIconForType = (type: string) => {
  switch (type) {
    case 'Placement': return <AssuredWorkloadIcon fontSize="small" />;
    case 'Result': return <CheckCircleIcon fontSize="small" />;
    case 'Event': return <EventIcon fontSize="small" />;
    default: return <InfoIcon fontSize="small" />;
  }
};

const getColorForType = (type: string): "primary" | "secondary" | "success" | "warning" | "error" | "info" | "default" => {
  switch (type) {
    case 'Placement': return 'error';
    case 'Result': return 'warning';
    case 'Event': return 'info';
    default: return 'default';
  }
};

export const NotificationCard: React.FC<Props> = ({ notification, isViewed, onView }) => {
  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderLeft: isViewed ? '4px solid transparent' : '4px solid #90caf9',
        backgroundColor: isViewed ? 'rgba(0, 30, 60, 0.5)' : '#001e3c',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          borderColor: '#90caf9'
        }
      }}
      onMouseEnter={() => onView(notification.ID)}
      onClick={() => onView(notification.ID)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Chip 
              icon={getIconForType(notification.Type)} 
              label={notification.Type} 
              color={getColorForType(notification.Type)} 
              size="small" 
              sx={{ fontWeight: 'bold' }}
            />
            {!isViewed && (
              <Chip label="UNREAD" color="primary" size="small" variant="filled" sx={{ height: '20px', fontSize: '0.65rem', fontWeight: 800, backgroundColor: '#1976d2' }} />
            )}
          </Box>
          <Typography variant="caption" sx={{ color: '#7ea6ce', fontFamily: 'monospace' }}>
            [{new Date(notification.Timestamp).toLocaleString()}]
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: isViewed ? 400 : 700, color: isViewed ? '#b2bac2' : '#ffffff' }}>
          {notification.Message}
        </Typography>
      </CardContent>
    </Card>
  );
};
