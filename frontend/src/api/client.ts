import { Airman, ComplianceStatus, DashboardMetrics, AirmanMatrixRow, Course } from '@/types/utm';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export interface DashboardMatrixApiResponse {
  squadronId: number;
  squadronName: string;
  metrics: DashboardMetrics;
  roster: AirmanMatrixRow[];
  courses: Course[];
}

export interface LoginApiResponse {
  adminId: number;
  email: string;
  fullName: string;
  role: 'SQUADRON_UTM' | 'WING_UTM';
  defaultSquadron: string;
  accessibleSquadrons: string[];
  token: string;
}

export async function fetchDashboardMatrixApi(squadronId: number): Promise<DashboardMatrixApiResponse> {
  const response = await fetch(`${API_BASE_URL}/dashboard/matrix?squadronId=${squadronId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch dashboard matrix: ${response.statusText}`);
  }
  return response.json();
}

export async function addAirmanApi(payload: {
  rank: string;
  firstName: string;
  lastName: string;
  edipi: string;
  email: string;
  squadronId: number;
  initialStatus: ComplianceStatus;
}): Promise<Airman> {
  const response = await fetch(`${API_BASE_URL}/dashboard/airmen`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Failed to add airman: ${response.statusText}`);
  }
  return response.json();
}

export async function bulkDeleteAirmenApi(airmanIds: number[]): Promise<{ success: boolean; deletedCount: number }> {
  const response = await fetch(`${API_BASE_URL}/dashboard/airmen/bulk`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ airmanIds }),
  });
  if (!response.ok) {
    throw new Error(`Failed to delete airmen: ${response.statusText}`);
  }
  return response.json();
}

export async function logCompletionApi(airmanId: number, courseCode: string, completedDate: string) {
  const response = await fetch(`${API_BASE_URL}/training/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ airmanId, courseCode, completedDate }),
  });
  return response.json();
}

export async function grantExemptionApi(airmanId: number, courseCode: string, reason: string) {
  const response = await fetch(`${API_BASE_URL}/training/exemption`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ airmanId, courseCode, reason }),
  });
  return response.json();
}

export async function invalidateCompletionApi(airmanId: number, courseCode: string) {
  const response = await fetch(`${API_BASE_URL}/training/invalidate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ airmanId, courseCode }),
  });
  return response.json();
}

export async function bulkTrainingActionApi(payload: {
  airmanIds: number[];
  courseCodes: string[];
  actionType: string;
  completedDate?: string;
  reason?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/training/bulk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.json();
}

export async function sendEmailNotificationsApi(airmanIds: number[], customMessage?: string) {
  const response = await fetch(`${API_BASE_URL}/notifications/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ airmanIds, customMessage }),
  });
  return response.json();
}

export async function loginApi(email: string, password: string): Promise<LoginApiResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error('Invalid credentials');
  }
  return response.json();
}
