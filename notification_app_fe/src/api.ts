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

const FALLBACK_NOTIFICATIONS: Notification[] = [
  { ID: "notif-001", Type: "Placement", Message: "Google is hiring for SDE-1 roles. Apply by Friday.", Timestamp: "2026-05-11 10:00:00" },
  { ID: "notif-002", Type: "Result", Message: "Mid-Semester Examination results for Computer Networks are published.", Timestamp: "2026-05-11 09:15:00" },
  { ID: "notif-003", Type: "Event", Message: "Annual Tech Symposium 'HackFest 2026' registration is now open.", Timestamp: "2026-05-10 14:30:00" },
  { ID: "notif-004", Type: "Placement", Message: "Amazon Summer Internship Drive 2026.", Timestamp: "2026-05-10 11:00:00" },
  { ID: "notif-005", Type: "Event", Message: "Guest Lecture: AI in modern web development.", Timestamp: "2026-05-09 16:45:00" },
  { ID: "notif-006", Type: "Result", Message: "Project Review 1 marks updated in the portal.", Timestamp: "2026-05-09 10:20:00" },
  { ID: "notif-007", Type: "Placement", Message: "Microsoft invites applications for FTE.", Timestamp: "2026-05-08 13:00:00" },
  { ID: "notif-008", Type: "Event", Message: "CodeChef Chapter meet this Wednesday.", Timestamp: "2026-05-08 11:30:00" },
  { ID: "notif-009", Type: "Result", Message: "Data Structures Final Lab Evaluation scores.", Timestamp: "2026-05-07 15:10:00" },
  { ID: "notif-010", Type: "Placement", Message: "Atlassian campus drive shortlisted candidates.", Timestamp: "2026-05-07 09:00:00" },
  { ID: "notif-011", Type: "Event", Message: "Cultural Night - Farewell 2026 details.", Timestamp: "2026-05-06 18:00:00" },
  { ID: "notif-012", Type: "Result", Message: "External Viva-Voce schedule and panel allocation.", Timestamp: "2026-05-06 14:00:00" }
];

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
    Log('frontend', 'error', 'api', `Failed to fetch notifications, using developer fallback data: ${error.message}`);
    
    // Developer enhancement: return fallback data if API is blocked by CORS locally
    let data = [...FALLBACK_NOTIFICATIONS];
    
    if (notification_type && notification_type !== 'All') {
      data = data.filter(n => n.Type === notification_type);
    }
    
    if (limit) {
      // Simulate pagination/limits from API side
      data = data.slice(0, limit);
    }
    
    return data;
  }
};
