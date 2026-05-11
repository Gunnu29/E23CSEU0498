import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import type { Notification } from '../api';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

interface Props {
  notification: Notification;
  isViewed: boolean;
  onView: (id: string) => void;
}

const getIconForType = (type: string) => {
  switch (type) {
    case 'Placement': return <WorkOutlineIcon fontSize="small" />;
    case 'Result': return <TaskAltIcon fontSize="small" />;
    case 'Event': return <EventOutlinedIcon fontSize="small" />;
    default: return <InfoOutlinedIcon fontSize="small" />;
  }
};

const getTypeStyles = (type: string) => {
  switch (type) {
    case 'Placement': return { color: '#059669', borderColor: '#059669', backgroundColor: '#ecfdf5' };
    case 'Result': return { color: '#d97706', borderColor: '#d97706', backgroundColor: '#fffbeb' };
    case 'Event': return { color: '#4b5563', borderColor: '#4b5563', backgroundColor: '#f3f4f6' };
    default: return { color: '#4b5563', borderColor: '#4b5563', backgroundColor: '#f3f4f6' };
  }
};

export const NotificationCard: React.FC<Props> = ({ notification, isViewed, onView }) => {
  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderLeft: isViewed ? '4px solid transparent' : '4px solid #111111',
        backgroundColor: isViewed ? '#ffffff' : '#fafafa',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
          borderColor: '#d1d5db'
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
              size="small" 
              variant="outlined"
              sx={{ ...getTypeStyles(notification.Type), '& .MuiChip-icon': { color: 'inherit' } }}
            />
            {!isViewed && (
              <Chip label="NEW" size="small" sx={{ height: '22px', fontSize: '0.65rem', fontWeight: 700, backgroundColor: '#111111', color: '#ffffff' }} />
            )}
          </Box>
          <Typography variant="caption" sx={{ color: '#9ca3af' }}>
            {new Date(notification.Timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: isViewed ? 400 : 600, color: isViewed ? '#6b7280' : '#111111' }}>
          {notification.Message}
        </Typography>
      </CardContent>
    </Card>
  );
};
