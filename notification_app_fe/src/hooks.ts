import { useState, useEffect } from 'react';
import { Log } from 'logger-middleware';

export const useViewedNotifications = () => {
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem('viewed_notifications');
      if (stored) {
        setViewedIds(new Set(JSON.parse(stored)));
      }
      Log('frontend', 'debug', 'hook', 'Loaded viewed notifications from localStorage');
    } catch (e) {
      Log('frontend', 'error', 'hook', 'Failed to load viewed notifications from localStorage');
    }
  }, []);

  const markAsViewed = (id: string) => {
    setViewedIds((prev) => {
      if (prev.has(id)) return prev;
      const newSet = new Set(prev);
      newSet.add(id);
      localStorage.setItem('viewed_notifications', JSON.stringify(Array.from(newSet)));
      Log('frontend', 'info', 'state', `Marked notification ${id} as viewed`);
      return newSet;
    });
  };

  const markAllAsViewed = (ids: string[]) => {
    setViewedIds((prev) => {
      const newSet = new Set(prev);
      let updated = false;
      ids.forEach((id) => {
        if (!newSet.has(id)) {
          newSet.add(id);
          updated = true;
        }
      });
      if (updated) {
        localStorage.setItem('viewed_notifications', JSON.stringify(Array.from(newSet)));
        Log('frontend', 'info', 'state', `Marked multiple notifications as viewed`);
      }
      return newSet;
    });
  };

  return { viewedIds, markAsViewed, markAllAsViewed };
};
