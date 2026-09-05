import { Course, AirmanMatrixRow, DashboardMetrics } from '@/types/utm';

// Map squadron name to numeric ID
export const SQUADRON_MAP: Record<string, number> = {
  '35 MXS': 1,
  '35 AMXS': 2,
  '35 CES': 3,
  '35 FSS': 4,
  '35 MXG': 5,
  '35 FW': 6,
};

// The 6 Primary Annual Air Force CBTs for the table columns
export const COURSES: Course[] = [
  { courseId: 1, courseCode: 'CYBER-AWARE', courseTitle: 'Cyber Awareness', frequencyMonths: 12, gracePeriodDays: 30 },
  { courseId: 2, courseCode: 'OPSEC-FUND',  courseTitle: 'OPSEC Fundamentals', frequencyMonths: 12, gracePeriodDays: 30 },
  { courseId: 3, courseCode: 'SAPR-ANNUAL', courseTitle: 'SAPR Annual', frequencyMonths: 12, gracePeriodDays: 30 },
  { courseId: 4, courseCode: 'CBRN-DEFENSE',courseTitle: 'CBRN Defense', frequencyMonths: 12, gracePeriodDays: 30 },
  { courseId: 5, courseCode: 'SUICIDE-PREV',courseTitle: 'Suicide Prevention', frequencyMonths: 12, gracePeriodDays: 30 },
  { courseId: 6, courseCode: 'TCCC-TRAUMA', courseTitle: 'TCCC / SABC', frequencyMonths: 12, gracePeriodDays: 30 },
];

// Full Multi-Squadron Roster matching data.sql
export const INITIAL_ROSTER: AirmanMatrixRow[] = [
  // 1. 35 MXS (Maintenance Squadron - Squadron ID: 1)
  {
    airman: { uid: 1, edipi: '1035000001', firstName: 'Marcus', lastName: 'Vance', rank: 'MSgt', email: 'marcus.vance@test.com', squadronId: 1 },
    courses: {
      'CYBER-AWARE': { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'OPSEC-FUND':  { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-11-20', expirationDate: '2026-11-20' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-09-10', expirationDate: '2026-09-10' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-11-20', expirationDate: '2026-11-20' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-09-10', expirationDate: '2026-09-10' },
    },
  },
  {
    airman: { uid: 2, edipi: '1035000002', firstName: 'Elena', lastName: 'Reyes', rank: 'TSgt', email: 'elena.reyes@test.com', squadronId: 1 },
    courses: {
      'CYBER-AWARE': { status: 'VALID', completedDate: '2025-08-14', expirationDate: '2026-08-14' },
      'OPSEC-FUND':  { status: 'VALID', completedDate: '2025-08-14', expirationDate: '2026-08-14' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-10-01', expirationDate: '2026-10-01' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-10-05', expirationDate: '2026-10-05' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-10-01', expirationDate: '2026-10-01' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-10-05', expirationDate: '2026-10-05' },
    },
  },
  {
    airman: { uid: 3, edipi: '1035000003', firstName: 'Jackson', lastName: 'Lee', rank: 'SSgt', email: 'jackson.lee@test.com', squadronId: 1 },
    courses: {
      'CYBER-AWARE': { status: 'EXPIRING', completedDate: '2025-09-15', expirationDate: '2026-09-15' },
      'OPSEC-FUND':  { status: 'EXPIRING', completedDate: '2025-09-15', expirationDate: '2026-09-15' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-07-20', expirationDate: '2026-07-20' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-09-15', expirationDate: '2026-09-15' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-07-20', expirationDate: '2026-07-20' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-09-15', expirationDate: '2026-09-15' },
    },
  },
  {
    airman: { uid: 4, edipi: '1035000004', firstName: 'Tyler', lastName: 'Brooks', rank: 'SSgt', email: 'tyler.brooks@test.com', squadronId: 1 },
    courses: {
      'CYBER-AWARE': { status: 'OVERDUE', completedDate: '2024-06-10', expirationDate: '2025-06-10' },
      'OPSEC-FUND':  { status: 'OVERDUE', completedDate: '2024-06-10', expirationDate: '2025-06-10' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-09-25', expirationDate: '2026-09-25' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-09-18', expirationDate: '2026-09-18' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-09-25', expirationDate: '2026-09-25' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-09-18', expirationDate: '2026-09-18' },
    },
  },
  {
    airman: { uid: 5, edipi: '1035000005', firstName: 'Chloe', lastName: 'Bennett', rank: 'SrA', email: 'chloe.bennett@test.com', squadronId: 1 },
    courses: {
      'CYBER-AWARE': { status: 'VALID', completedDate: '2025-12-05', expirationDate: '2026-12-05' },
      'OPSEC-FUND':  { status: 'VALID', completedDate: '2025-12-05', expirationDate: '2026-12-05' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-10-12', expirationDate: '2026-10-12' },
      'CBRN-DEFENSE':{ status: 'WAIVER', reason: 'Medical Profile - Mask Fit' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-10-12', expirationDate: '2026-10-12' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-09-20', expirationDate: '2026-09-20' },
    },
  },
  {
    airman: { uid: 6, edipi: '1035000006', firstName: 'Darius', lastName: 'Washington', rank: 'SrA', email: 'darius.w@test.com', squadronId: 1 },
    courses: {
      'CYBER-AWARE': { status: 'VALID', completedDate: '2025-08-10', expirationDate: '2026-08-10' },
      'OPSEC-FUND':  { status: 'VALID', completedDate: '2025-08-10', expirationDate: '2026-08-10' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-09-22', expirationDate: '2026-09-22' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-08-10', expirationDate: '2026-08-10' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-09-22', expirationDate: '2026-09-22' },
      'TCCC-TRAUMA': { status: 'WAIVER', reason: 'TDY to Kadena AB (Cope North)' },
    },
  },
  {
    airman: { uid: 7, edipi: '1035000007', firstName: 'Liam', lastName: 'OConnor', rank: 'A1C', email: 'liam.oconnor@test.com', squadronId: 1 },
    courses: {
      'CYBER-AWARE': { status: 'VALID', completedDate: '2025-11-01', expirationDate: '2026-11-01' },
      'OPSEC-FUND':  { status: 'VALID', completedDate: '2025-11-01', expirationDate: '2026-11-01' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-11-01', expirationDate: '2026-11-01' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-11-01', expirationDate: '2026-11-01' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-11-01', expirationDate: '2026-11-01' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-11-01', expirationDate: '2026-11-01' },
    },
  },
  {
    airman: { uid: 8, edipi: '1035000008', firstName: 'Sophia', lastName: 'Chen', rank: 'A1C', email: 'sophia.chen@test.com', squadronId: 1 },
    courses: {
      'CYBER-AWARE': { status: 'VALID', completedDate: '2025-10-18', expirationDate: '2026-10-18' },
      'OPSEC-FUND':  { status: 'VALID', completedDate: '2025-10-18', expirationDate: '2026-10-18' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-10-18', expirationDate: '2026-10-18' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-10-18', expirationDate: '2026-10-18' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-10-18', expirationDate: '2026-10-18' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-10-18', expirationDate: '2026-10-18' },
    },
  },

  // 2. 35 AMXS (Aircraft Maintenance Squadron - Squadron ID: 2)
  {
    airman: { uid: 9, edipi: '1035000009', firstName: 'Nathan', lastName: 'Drake', rank: 'TSgt', email: 'nathan.drake@test.com', squadronId: 2 },
    courses: {
      'CYBER-AWARE': { status: 'VALID', completedDate: '2025-10-10', expirationDate: '2026-10-10' },
      'OPSEC-FUND':  { status: 'VALID', completedDate: '2025-10-10', expirationDate: '2026-10-10' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-11-05', expirationDate: '2026-11-05' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-09-15', expirationDate: '2026-09-15' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-11-05', expirationDate: '2026-11-05' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-06-20', expirationDate: '2026-06-20' },
    },
  },
  {
    airman: { uid: 10, edipi: '1035000010', firstName: 'Maya', lastName: 'Lin', rank: 'SSgt', email: 'maya.lin@test.com', squadronId: 2 },
    courses: {
      'CYBER-AWARE': { status: 'VALID', completedDate: '2025-11-01', expirationDate: '2026-11-01' },
      'OPSEC-FUND':  { status: 'EXPIRING', completedDate: '2025-09-12', expirationDate: '2026-09-12' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-10-10', expirationDate: '2026-10-10' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-09-15', expirationDate: '2026-09-15' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-10-10', expirationDate: '2026-10-10' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-11-01', expirationDate: '2026-11-01' },
    },
  },
  {
    airman: { uid: 11, edipi: '1035000011', firstName: 'Lucas', lastName: 'Gomez', rank: 'SrA', email: 'lucas.gomez@test.com', squadronId: 2 },
    courses: {
      'CYBER-AWARE': { status: 'OVERDUE', completedDate: '2024-05-15', expirationDate: '2025-05-15' },
      'OPSEC-FUND':  { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-11-20', expirationDate: '2026-11-20' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-09-10', expirationDate: '2026-09-10' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-11-20', expirationDate: '2026-11-20' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-09-10', expirationDate: '2026-09-10' },
    },
  },
  {
    airman: { uid: 12, edipi: '1035000012', firstName: 'Aiden', lastName: 'Kowalski', rank: 'A1C', email: 'aiden.kowalski@test.com', squadronId: 2 },
    courses: {
      'CYBER-AWARE': { status: 'VALID', completedDate: '2025-10-01', expirationDate: '2026-10-01' },
      'OPSEC-FUND':  { status: 'VALID', completedDate: '2025-10-01', expirationDate: '2026-10-01' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-10-01', expirationDate: '2026-10-01' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-10-01', expirationDate: '2026-10-01' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-10-01', expirationDate: '2026-10-01' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-10-01', expirationDate: '2026-10-01' },
    },
  },

  // 3. 35 CES (Civil Engineer Squadron - Squadron ID: 3)
  {
    airman: { uid: 13, edipi: '1035000013', firstName: 'Victor', lastName: 'Steele', rank: 'MSgt', email: 'victor.steele@test.com', squadronId: 3 },
    courses: {
      'CYBER-AWARE': { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'OPSEC-FUND':  { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-11-20', expirationDate: '2026-11-20' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-09-10', expirationDate: '2026-09-10' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-11-20', expirationDate: '2026-11-20' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-09-10', expirationDate: '2026-09-10' },
    },
  },
  {
    airman: { uid: 14, edipi: '1035000014', firstName: 'Hannah', lastName: 'Abbott', rank: 'SSgt', email: 'hannah.abbott@test.com', squadronId: 3 },
    courses: {
      'CYBER-AWARE': { status: 'VALID', completedDate: '2025-09-10', expirationDate: '2026-09-10' },
      'OPSEC-FUND':  { status: 'VALID', completedDate: '2025-09-10', expirationDate: '2026-09-10' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-09-10', expirationDate: '2026-09-10' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-09-10', expirationDate: '2026-09-10' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-09-10', expirationDate: '2026-09-10' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-09-10', expirationDate: '2026-09-10' },
    },
  },

  // 4. 35 FSS (Force Support Squadron - Squadron ID: 4)
  {
    airman: { uid: 15, edipi: '1035000015', firstName: 'Rachel', lastName: 'Adams', rank: 'TSgt', email: 'rachel.adams@test.com', squadronId: 4 },
    courses: {
      'CYBER-AWARE': { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'OPSEC-FUND':  { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
    },
  },

  // 5. 35 MXG (Maintenance Group Staff - Squadron ID: 5)
  {
    airman: { uid: 16, edipi: '1035000016', firstName: 'Kenji', lastName: 'Takahashi', rank: 'SMSgt', email: 'kenji.takahashi@test.com', squadronId: 5 },
    courses: {
      'CYBER-AWARE': { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'OPSEC-FUND':  { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
    },
  },
  {
    airman: { uid: 17, edipi: '1035000017', firstName: 'Samantha', lastName: 'Hayes', rank: 'TSgt', email: 'samantha.hayes@test.com', squadronId: 5 },
    courses: {
      'CYBER-AWARE': { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'OPSEC-FUND':  { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
    },
  },

  // 6. 35 FW (Wing Staff - Squadron ID: 6)
  {
    airman: { uid: 18, edipi: '1035000018', firstName: 'Alexander', lastName: 'Cross', rank: 'Col', email: 'alexander.cross@test.com', squadronId: 6 },
    courses: {
      'CYBER-AWARE': { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'OPSEC-FUND':  { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'SAPR-ANNUAL': { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'CBRN-DEFENSE':{ status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'SUICIDE-PREV':{ status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
      'TCCC-TRAUMA': { status: 'VALID', completedDate: '2025-10-15', expirationDate: '2026-10-15' },
    },
  },
];

// Calculate summary metrics for a given squadron roster
export function calculateMetrics(roster: AirmanMatrixRow[]): DashboardMetrics {
  let totalCells = 0;
  let validCells = 0;
  let overdueCount = 0;
  let expiringCount = 0;
  let waiverCount = 0;

  roster.forEach((row) => {
    Object.values(row.courses).forEach((detail) => {
      totalCells++;
      if (detail.status === 'VALID') validCells++;
      else if (detail.status === 'OVERDUE') overdueCount++;
      else if (detail.status === 'EXPIRING') expiringCount++;
      else if (detail.status === 'WAIVER') {
        waiverCount++;
        validCells++; // Waivers count towards readiness
      }
    });
  });

  const readinessPercentage = totalCells > 0 ? Math.round((validCells / totalCells) * 1000) / 10 : 100;

  return {
    readinessPercentage,
    totalAirmen: roster.length,
    overdueCount,
    expiringCount,
    waiverCount,
  };
}
