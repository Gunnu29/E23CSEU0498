import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Button } from '@mui/material';
import { fetchNotifications } from '../api';
import type { Notification } from '../api';
import { useViewedNotifications } from '../hooks';
import { NotificationCard } from '../components/NotificationCard';
import { Log } from 'logger-middleware';

export const AllNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { viewedIds, markAsViewed, markAllAsViewed } = useViewedNotifications();

  useEffect(() => {
    const loadData = async () => {
      Log('frontend', 'info', 'page', 'Loading All Notifications page');
      setLoading(true);
      const data = await fetchNotifications();
      setNotifications(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleMarkAll = () => {
    Log('frontend', 'info', 'component', 'User clicked Mark All as Read');
    markAllAsViewed(notifications.map(n => n.ID));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          All Notifications
        </Typography>
        <Button variant="outlined" onClick={handleMarkAll}>
          Mark All as Read
        </Button>
      </Box>
      {notifications.length === 0 ? (
        <Typography color="textSecondary">No notifications found.</Typography>
      ) : (
        notifications.map((notif) => (
          <NotificationCard 
            key={notif.ID} 
            notification={notif} 
            isViewed={viewedIds.has(notif.ID)} 
            onView={markAsViewed}
          />
        ))
      )}
    </Container>
  );
};
