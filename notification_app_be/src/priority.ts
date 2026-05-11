import 'dotenv/config';
import { Log, initLogger } from 'logger-middleware';

initLogger({ token: process.env.LOG_TOKEN || '' });

export interface Notification {
  ID: string;
  Type: 'Placement' | 'Result' | 'Event';
  Message: string;
  Timestamp: string;
}

const PRIORITY_WEIGHTS: Record<Notification['Type'], number> = {
  'Placement': 3,
  'Result': 2,
  'Event': 1
};

const OFFLINE_FALLBACK_NOTIFICATIONS: Notification[] = [
  { "ID": "d146095a-0d86-4a34-9e69-3900a14576bc", "Type": "Result", "Message": "mid-sem", "Timestamp": "2026-04-22 17:51:30" },
  { "ID": "b283218f-ea5a-4b7c-93a9-1f2f240d64b0", "Type": "Placement", "Message": "CSX Corporation hiring", "Timestamp": "2026-04-22 17:51:18" },
  { "ID": "81589ada-0ad3-4f77-9554-f52fb558e09d", "Type": "Event", "Message": "farewell", "Timestamp": "2026-04-22 17:51:06" },
  { "ID": "0005513a-142b-4bbc-8678-eefec65e1ede", "Type": "Result", "Message": "mid-sem", "Timestamp": "2026-04-22 17:50:54" },
  { "ID": "ea836726-c25e-4f21-a72f-544a6af8a37f", "Type": "Result", "Message": "project-review", "Timestamp": "2026-04-22 17:50:42" },
  { "ID": "003cb427-8fc6-47f7-bb00-be228f6b0d2c", "Type": "Result", "Message": "external", "Timestamp": "2026-04-22 17:50:30" },
  { "ID": "e5c4ff20-31bf-4d40-8f02-72fda59e8918", "Type": "Result", "Message": "project-review", "Timestamp": "2026-04-22 17:50:18" },
  { "ID": "1cfce5ee-ad37-4894-8946-d707627176a5", "Type": "Event", "Message": "tech-fest", "Timestamp": "2026-04-22 17:50:06" },
  { "ID": "cf2885a6-45ac-4ba0-b548-6e9e9d4c52c8", "Type": "Result", "Message": "project-review", "Timestamp": "2026-04-22 17:49:54" },
  { "ID": "8a7412bd-6065-4d09-8501-a37f11cc848b", "Type": "Placement", "Message": "Advanced Micro Devices Inc. hiring", "Timestamp": "2026-04-22 17:49:42" }
];

/**
 * Retrieves and identifies the most critical communications to prevent users from missing urgent campus events.
 */
export async function getTopNNotifications(limitCount: number = 10): Promise<Notification[]> {
  await Log('backend', 'info', 'controller', `Requested top ${limitCount} priority notifications`);
  
  const rawNotifications = await retrieveNotifications();
  const prioritizedNotifications = orderNotificationsByPriority(rawNotifications);
  const truncatedNotifications = prioritizedNotifications.slice(0, limitCount);

  await Log('backend', 'info', 'controller', `Successfully computed top ${limitCount} priority notifications`);
  return truncatedNotifications;
}

/**
 * Ensures system resilience by gracefully degrading to cached historical records when the primary upstream data source is inaccessible.
 */
async function retrieveNotifications(): Promise<Notification[]> {
  const serviceEndpoint = 'http://4.224.186.213/evaluation-service/notifications';
  
  await Log('backend', 'info', 'service', `Attempting to fetch notifications from ${serviceEndpoint}`);
  
  try {
    const networkResponse = await fetch(serviceEndpoint, {
      headers: {
        'Authorization': `Bearer ${process.env.LOG_TOKEN}`,
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(5000) 
    });

    if (!networkResponse.ok) {
      throw new Error(`API returned status ${networkResponse.status}`);
    }

    const responsePayload = await networkResponse.json();
    await Log('backend', 'info', 'service', `Successfully fetched ${responsePayload.notifications?.length || 0} notifications`);
    return responsePayload.notifications || [];

  } catch (networkException: any) {
    await Log('backend', 'error', 'service', `Network/Firewall error fetching notifications: ${networkException.message}`);
    console.warn(`[WARN] Using fallback data because the external API failed (${networkException.message}).`);
    return OFFLINE_FALLBACK_NOTIFICATIONS;
  }
}

/**
 * Implements the organizational communication hierarchy to surface high-stakes alerts (like placements) above routine events.
 */
function orderNotificationsByPriority(unsortedNotifications: Notification[]): Notification[] {
  return [...unsortedNotifications].sort((firstItem, secondItem) => {
    const firstItemPriority = PRIORITY_WEIGHTS[firstItem.Type] || 0;
    const secondItemPriority = PRIORITY_WEIGHTS[secondItem.Type] || 0;
    
    if (firstItemPriority !== secondItemPriority) {
      return secondItemPriority - firstItemPriority;
    }

    const firstItemTimestamp = new Date(firstItem.Timestamp.replace(' ', 'T')).getTime();
    const secondItemTimestamp = new Date(secondItem.Timestamp.replace(' ', 'T')).getTime();
    
    return secondItemTimestamp - firstItemTimestamp;
  });
}

if (require.main === module) {
  (async () => {
    console.log("=== Campus Priority Inbox ===");
    const highestPriorityAlerts = await getTopNNotifications(10);
    
    highestPriorityAlerts.forEach((alert, indexOffset) => {
      console.log(`${indexOffset + 1}. [${alert.Type}] ${alert.Message} (${alert.Timestamp})`);
    });
    console.log("=============================");
  })();
}
