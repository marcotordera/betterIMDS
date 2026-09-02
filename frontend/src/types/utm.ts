// =============================================================================
// UTM Dashboard TypeScript Types (Clean & Junior-Friendly)
// =============================================================================

export type ComplianceStatus = 'VALID' | 'EXPIRING' | 'OVERDUE' | 'WAIVER';

export interface Airman {
  uid: number;
  edipi: string;
  firstName: string;
  lastName: string;
  rank: string;
  email: string;
  squadronId: number;
}

export interface Course {
  courseId: number;
  courseCode: string;
  courseTitle: string;
  frequencyMonths: number;
  gracePeriodDays: number;
}

export interface StatusDetail {
  status: ComplianceStatus;
  completedDate?: string;
  expirationDate?: string;
  reason?: string; // For waivers or exemptions
}

export interface AirmanMatrixRow {
  airman: Airman;
  // Map of courseCode -> status (e.g. 'CYBER-AWARE' -> { status: 'VALID' })
  courses: Record<string, StatusDetail>;
}

export interface DashboardMetrics {
  readinessPercentage: number;
  totalAirmen: number;
  overdueCount: number;
  expiringCount: number;
  waiverCount: number;
}
