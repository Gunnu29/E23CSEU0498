import axios from 'axios';
import { Log } from 'logger-middleware';

export interface Notification {
  ID: string;
  Type: 'Placement' | 'Result' | 'Event';
  Message: string;
  Timestamp: string;
}

const API_URL = 'http://4.224.186.213/evaluation-service/notifications';
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJlMjNjc2V1MDQ5OEBiZW5uZXR0LmVkdS5pbiIsImV4cCI6MTc3ODQ4Nzk1MSwiaWF0IjoxNzc4NDg3MDUxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzZkMzQwOTMtNzVhNy00OTY5LWFjNzEtM2JmZTEyYmQwOTkxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZ2Fydml0YSBiYXRyYSIsInN1YiI6IjZjNDE1NDRhLWU3YjUtNDU0ZC05M2Y0LWRmYWQzOTI1NjA2YiJ9LCJlbWFpbCI6ImUyM2NzZXUwNDk4QGJlbm5ldHQuZWR1LmluIiwibmFtZSI6ImdhcnZpdGEgYmF0cmEiLCJyb2xsTm8iOiJlMjNjc2V1MDQ5OCIsImFjY2Vzc0NvZGUiOiJUZkR4Z3IiLCJjbGllbnRJRCI6IjZjNDE1NDRhLWU3YjUtNDU0ZC05M2Y0LWRmYWQzOTI1NjA2YiIsImNsaWVudFNlY3JldCI6IkhuZlBYeUpSckdadHdNV1QifQ.1jgV6LOqZL76K9WxwmDkwDbNlca5iAXGR64Msc7T33g";

export const fetchNotifications = async (
  limit?: number,
  page?: number,
  notification_type?: string
): Promise<Notification[]> => {
  try {
    const params: Record<string, any> = {};
    if (limit) params.limit = limit;
    if (page) params.page = page;
    if (notification_type && notification_type !== 'All') {
      params.notification_type = notification_type;
    }

    Log('frontend', 'info', 'api', `Fetching notifications with params: ${JSON.stringify(params)}`);

    const response = await axios.get<{ notifications: Notification[] }>(API_URL, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      params,
    });

    Log('frontend', 'info', 'api', `Successfully fetched ${response.data.notifications?.length || 0} notifications`);
    return response.data.notifications || [];
  } catch (error: any) {
    Log('frontend', 'error', 'api', `Failed to fetch notifications: ${error.message}`);
    // Return empty array as fallback if API fails
    return [];
  }
};
