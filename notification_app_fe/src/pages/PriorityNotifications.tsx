import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Button, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { fetchNotifications } from '../api';
import type { Notification } from '../api';
import { useViewedNotifications } from '../hooks';
import { NotificationCard } from '../components/NotificationCard';
import { Log } from 'logger-middleware';

const PRIORITY_WEIGHTS: Record<string, number> = {
  'Placement': 3,
  'Result': 2,
  'Event': 1
};

export const PriorityNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(10);
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const { viewedIds, markAsViewed, markAllAsViewed } = useViewedNotifications();

  useEffect(() => {
    const loadData = async () => {
      Log('frontend', 'info', 'page', `Loading Priority Notifications (limit: ${limit}, type: ${typeFilter})`);
      setLoading(true);
      const data = await fetchNotifications(limit, 1, typeFilter);
      
      // Even if API filters/limits, we should ensure the order is strict Priority order based on Stage 1 rules
      const sorted = [...data].sort((a, b) => {
        const weightA = PRIORITY_WEIGHTS[a.Type] || 0;
        const weightB = PRIORITY_WEIGHTS[b.Type] || 0;
        if (weightA !== weightB) return weightB - weightA;
        return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
      });

      setNotifications(sorted.slice(0, limit));
      setLoading(false);
    };
    loadData();
  }, [limit, typeFilter]);

  const handleMarkAll = () => {
    Log('frontend', 'info', 'component', 'User clicked Mark All as Read on Priority Page');
    markAllAsViewed(notifications.map(n => n.ID));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" component="h1">
          Priority Inbox
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField 
            type="number" 
            label="Top N" 
            value={limit} 
            onChange={(e) => setLimit(Number(e.target.value) || 10)}
            size="small"
            sx={{ width: '100px' }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={typeFilter}
              label="Type"
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="All">All Types</MenuItem>
              <MenuItem value="Placement">Placement</MenuItem>
              <MenuItem value="Result">Result</MenuItem>
              <MenuItem value="Event">Event</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={handleMarkAll}>
            Mark All Read
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : notifications.length === 0 ? (
        <Typography color="textSecondary">No priority notifications found.</Typography>
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
