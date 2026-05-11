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
        borderLeft: isViewed ? '4px solid transparent' : '4px solid #1976d2',
        backgroundColor: isViewed ? '#f9f9f9' : '#ffffff',
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': {
          boxShadow: 3
        }
      }}
      onMouseEnter={() => onView(notification.ID)}
      onClick={() => onView(notification.ID)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip 
              icon={getIconForType(notification.Type)} 
              label={notification.Type} 
              color={getColorForType(notification.Type)} 
              size="small" 
            />
            {!isViewed && (
              <Chip label="New" color="primary" size="small" variant="outlined" sx={{ height: '20px', fontSize: '0.7rem' }} />
            )}
          </Box>
          <Typography variant="caption" color="textSecondary">
            {new Date(notification.Timestamp).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: isViewed ? 'normal' : 'bold' }}>
          {notification.Message}
        </Typography>
      </CardContent>
    </Card>
  );
};
