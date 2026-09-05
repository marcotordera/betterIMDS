import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { Airman, AirmanMatrixRow, ComplianceStatus, StatusDetail } from '@/types/utm';
import { INITIAL_ROSTER, SQUADRON_MAP, COURSES, calculateMetrics } from './mockData';

export type BulkActionType = 'VALID' | 'WAIVER' | 'OVERDUE';
export type SortOrder = 'asc' | 'desc';

export interface ActiveCellModal {
  open: boolean;
  airmanId?: number;
  courseCode?: string;
}

export interface ActiveBulkModal {
  open: boolean;
  actionType: BulkActionType | null;
}

export interface ActiveAirmanProfileModal {
  open: boolean;
  airmanId?: number;
}

export interface DashboardState {
  selectedSquadron: string;
  darkMode: boolean;
  statusFilter: 'ALL' | 'OVERDUE' | 'EXPIRING' | 'WAIVER';
  sortField: string;
  sortOrder: SortOrder;
  roster: AirmanMatrixRow[];
  selectedAirmanIds: number[];
  activeCellModal: ActiveCellModal;
  activeBulkModal: ActiveBulkModal;
  activeAirmanProfileModal: ActiveAirmanProfileModal;
  isAddAirmanModalOpen: boolean;
}

const initialState: DashboardState = {
  selectedSquadron: '35 MXS',
  darkMode: false,
  statusFilter: 'ALL',
  sortField: 'name',
  sortOrder: 'asc',
  roster: INITIAL_ROSTER,
  selectedAirmanIds: [],
  activeCellModal: { open: false },
  activeBulkModal: { open: false, actionType: null },
  activeAirmanProfileModal: { open: false },
  isAddAirmanModalOpen: false,
};

export const RANK_ORDER: Record<string, number> = {
  // Officers
  'Gen': 20, 'Lt Gen': 19, 'Maj Gen': 18, 'Brig Gen': 17,
  'Col': 16, 'Lt Col': 15, 'Maj': 14, 'Capt': 13, '1st Lt': 12, '2nd Lt': 11,
  // Enlisted
  'CMSAF': 10, 'CMSgt': 9, 'SMSgt': 8, 'MSgt': 7,
  'TSgt': 6, 'SSgt': 5, 'SrA': 4, 'A1C': 3, 'Amn': 2, 'AB': 1,
};

export const STATUS_ORDER: Record<string, number> = {
  'OVERDUE': 1,
  'EXPIRING': 2,
  'WAIVER': 3,
  'VALID': 4,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedSquadron: (state, action: PayloadAction<string>) => {
      state.selectedSquadron = action.payload;
      state.selectedAirmanIds = [];
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setStatusFilter: (state, action: PayloadAction<'ALL' | 'OVERDUE' | 'EXPIRING' | 'WAIVER'>) => {
      state.statusFilter = action.payload;
    },
    setSorting: (state, action: PayloadAction<string>) => {
      const field = action.payload;
      if (state.sortField === field) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortField = field;
        state.sortOrder = 'asc';
      }
    },
    toggleSelectAirman: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.selectedAirmanIds = state.selectedAirmanIds.includes(id)
        ? state.selectedAirmanIds.filter((x) => x !== id)
        : [...state.selectedAirmanIds, id];
    },
    selectAllAirmen: (state, action: PayloadAction<number[]>) => {
      state.selectedAirmanIds = action.payload;
    },
    clearSelection: (state) => {
      state.selectedAirmanIds = [];
    },
    openCellModal: (state, action: PayloadAction<{ airmanId: number; courseCode: string }>) => {
      state.activeCellModal = { open: true, ...action.payload };
    },
    closeCellModal: (state) => {
      state.activeCellModal = { open: false };
    },
    openBulkModal: (state, action: PayloadAction<BulkActionType>) => {
      state.activeBulkModal = { open: true, actionType: action.payload };
    },
    closeBulkModal: (state) => {
      state.activeBulkModal = { open: false, actionType: null };
    },
    openAirmanProfileModal: (state, action: PayloadAction<number>) => {
      state.activeAirmanProfileModal = { open: true, airmanId: action.payload };
    },
    closeAirmanProfileModal: (state) => {
      state.activeAirmanProfileModal = { open: false };
    },
    logCompletion: (
      state,
      action: PayloadAction<{ airmanId: number; courseCode: string; completedDate: string }>
    ) => {
      const { airmanId, courseCode, completedDate } = action.payload;
      const dateObj = new Date(completedDate);
      dateObj.setFullYear(dateObj.getFullYear() + 1);
      const expirationDate = dateObj.toISOString().split('T')[0];

      const row = state.roster.find((r) => r.airman.uid === airmanId);
      if (row) {
        row.courses[courseCode] = {
          status: 'VALID' as ComplianceStatus,
          completedDate,
          expirationDate,
        };
      }
      state.activeCellModal = { open: false };
    },
    grantExemption: (
      state,
      action: PayloadAction<{ airmanId: number; courseCode: string; reason: string }>
    ) => {
      const { airmanId, courseCode, reason } = action.payload;
      const row = state.roster.find((r) => r.airman.uid === airmanId);
      if (row) {
        row.courses[courseCode] = {
          status: 'WAIVER' as ComplianceStatus,
          reason: reason || 'Approved Exemption / Waiver',
        };
      }
      state.activeCellModal = { open: false };
    },
    invalidateCompletion: (
      state,
      action: PayloadAction<{ airmanId: number; courseCode: string }>
    ) => {
      const { airmanId, courseCode } = action.payload;
      const row = state.roster.find((r) => r.airman.uid === airmanId);
      if (row) {
        row.courses[courseCode] = {
          status: 'OVERDUE' as ComplianceStatus,
        };
      }
      state.activeCellModal = { open: false };
    },
    bulkLogCompletion: (
      state,
      action: PayloadAction<{ airmanIds: number[]; courseCodes: string[]; completedDate: string }>
    ) => {
      const { airmanIds, courseCodes, completedDate } = action.payload;
      const dateObj = new Date(completedDate);
      dateObj.setFullYear(dateObj.getFullYear() + 1);
      const expirationDate = dateObj.toISOString().split('T')[0];

      state.roster.forEach((row) => {
        if (airmanIds.includes(row.airman.uid)) {
          courseCodes.forEach((code) => {
            row.courses[code] = {
              status: 'VALID' as ComplianceStatus,
              completedDate,
              expirationDate,
            };
          });
        }
      });
      state.selectedAirmanIds = [];
      state.activeBulkModal = { open: false, actionType: null };
    },
    bulkGrantExemption: (
      state,
      action: PayloadAction<{ airmanIds: number[]; courseCodes: string[]; reason: string }>
    ) => {
      const { airmanIds, courseCodes, reason } = action.payload;
      state.roster.forEach((row) => {
        if (airmanIds.includes(row.airman.uid)) {
          courseCodes.forEach((code) => {
            row.courses[code] = {
              status: 'WAIVER' as ComplianceStatus,
              reason: reason || 'Approved Exemption / Waiver',
            };
          });
        }
      });
      state.selectedAirmanIds = [];
      state.activeBulkModal = { open: false, actionType: null };
    },
    bulkInvalidateCompletion: (
      state,
      action: PayloadAction<{ airmanIds: number[]; courseCodes: string[] }>
    ) => {
      const { airmanIds, courseCodes } = action.payload;
      state.roster.forEach((row) => {
        if (airmanIds.includes(row.airman.uid)) {
          courseCodes.forEach((code) => {
            row.courses[code] = {
              status: 'OVERDUE' as ComplianceStatus,
            };
          });
        }
      });
      state.selectedAirmanIds = [];
      state.activeBulkModal = { open: false, actionType: null };
    },
    removeSelectedAirmen: (state) => {
      const selectedSet = new Set(state.selectedAirmanIds);
      state.roster = state.roster.filter((row) => !selectedSet.has(row.airman.uid));
      state.selectedAirmanIds = [];
    },
    removeAirmen: (state, action: PayloadAction<number[]>) => {
      const idsToRemove = new Set(action.payload);
      state.roster = state.roster.filter((row) => !idsToRemove.has(row.airman.uid));
      state.selectedAirmanIds = state.selectedAirmanIds.filter((id) => !idsToRemove.has(id));
    },
    openAddAirmanModal: (state) => {
      state.isAddAirmanModalOpen = true;
    },
    closeAddAirmanModal: (state) => {
      state.isAddAirmanModalOpen = false;
    },
    addAirman: (
      state,
      action: PayloadAction<{ airman: Omit<Airman, 'uid'>; initialStatus?: ComplianceStatus }>
    ) => {
      const nextUid = state.roster.reduce((max, r) => Math.max(max, r.airman.uid), 0) + 1;
      const status = action.payload.initialStatus || 'EXPIRING';
      const coursesMap: Record<string, StatusDetail> = {};

      COURSES.forEach((course) => {
        if (status === 'EXPIRING') {
          const expDate = new Date();
          expDate.setDate(expDate.getDate() + 30);
          const completedDate = new Date();
          completedDate.setMonth(completedDate.getMonth() - (course.frequencyMonths - 1));
          coursesMap[course.courseCode] = {
            status: 'EXPIRING',
            completedDate: completedDate.toISOString().split('T')[0],
            expirationDate: expDate.toISOString().split('T')[0],
          };
        } else if (status === 'VALID') {
          const today = new Date().toISOString().split('T')[0];
          const nextYear = new Date();
          nextYear.setFullYear(nextYear.getFullYear() + 1);
          coursesMap[course.courseCode] = {
            status: 'VALID',
            completedDate: today,
            expirationDate: nextYear.toISOString().split('T')[0],
          };
        } else {
          coursesMap[course.courseCode] = {
            status: 'OVERDUE',
          };
        }
      });

      state.roster.unshift({
        airman: {
          ...action.payload.airman,
          uid: nextUid,
        },
        courses: coursesMap,
      });
      state.isAddAirmanModalOpen = false;
    },
  },
});

export const {
  setSelectedSquadron,
  toggleDarkMode,
  setStatusFilter,
  setSorting,
  toggleSelectAirman,
  selectAllAirmen,
  clearSelection,
  openCellModal,
  closeCellModal,
  openBulkModal,
  closeBulkModal,
  openAirmanProfileModal,
  closeAirmanProfileModal,
  openAddAirmanModal,
  closeAddAirmanModal,
  addAirman,
  logCompletion,
  grantExemption,
  invalidateCompletion,
  bulkLogCompletion,
  bulkGrantExemption,
  bulkInvalidateCompletion,
  removeSelectedAirmen,
  removeAirmen,
} = dashboardSlice.actions;

// =============================================================================
// Memoized Redux Selectors
// =============================================================================

export const selectDashboardState = (state: RootState) => state.dashboard;
export const selectSelectedSquadron = (state: RootState) => state.dashboard.selectedSquadron;
export const selectRoster = (state: RootState) => state.dashboard.roster;
export const selectStatusFilter = (state: RootState) => state.dashboard.statusFilter;
export const selectSortField = (state: RootState) => state.dashboard.sortField;
export const selectSortOrder = (state: RootState) => state.dashboard.sortOrder;
export const selectSelectedAirmanIds = (state: RootState) => state.dashboard.selectedAirmanIds;
export const selectActiveCellModal = (state: RootState) => state.dashboard.activeCellModal;
export const selectActiveBulkModal = (state: RootState) => state.dashboard.activeBulkModal;
export const selectActiveAirmanProfileModal = (state: RootState) => state.dashboard.activeAirmanProfileModal;
export const selectIsAddAirmanModalOpen = (state: RootState) => state.dashboard.isAddAirmanModalOpen;
export const selectDarkMode = (state: RootState) => state.dashboard.darkMode;

export const selectSquadronRoster = createSelector(
  [selectRoster, selectSelectedSquadron],
  (roster, selectedSquadron) => {
    const targetSquadronId = SQUADRON_MAP[selectedSquadron] || 1;
    return roster.filter((row) => row.airman.squadronId === targetSquadronId);
  }
);

export const selectActiveAirmanRow = createSelector(
  [selectRoster, selectActiveAirmanProfileModal],
  (roster, modal) => (modal.airmanId ? roster.find((r) => r.airman.uid === modal.airmanId) : undefined)
);

export const selectFilteredRoster = createSelector(
  [selectSquadronRoster, selectStatusFilter, selectSortField, selectSortOrder],
  (squadronRoster, statusFilter, sortField, sortOrder) => {
    const filtered = squadronRoster.filter((row) => {
      if (statusFilter === 'ALL') return true;
      return Object.values(row.courses).some((detail) => detail.status === statusFilter);
    });

    const modifier = sortOrder === 'asc' ? 1 : -1;

    return [...filtered].sort((a, b) => {
      if (sortField === 'rank') {
        const rankA = RANK_ORDER[a.airman.rank] || 0;
        const rankB = RANK_ORDER[b.airman.rank] || 0;
        if (rankA !== rankB) return (rankA - rankB) * modifier;
        return a.airman.lastName.localeCompare(b.airman.lastName) * modifier;
      }

      if (sortField === 'name') {
        const nameCompare = a.airman.lastName.localeCompare(b.airman.lastName);
        if (nameCompare !== 0) return nameCompare * modifier;
        return a.airman.firstName.localeCompare(b.airman.firstName) * modifier;
      }

      if (sortField === 'edipi') {
        return a.airman.edipi.localeCompare(b.airman.edipi) * modifier;
      }

      // CBT Course column sorting
      const statusA = STATUS_ORDER[a.courses[sortField]?.status || ''] || 0;
      const statusB = STATUS_ORDER[b.courses[sortField]?.status || ''] || 0;
      if (statusA !== statusB) return (statusA - statusB) * modifier;

      return a.airman.lastName.localeCompare(b.airman.lastName);
    });
  }
);

export const selectDashboardMetrics = createSelector(
  [selectSquadronRoster],
  (squadronRoster) => calculateMetrics(squadronRoster)
);

export const selectSelectedAirmen = createSelector(
  [selectSquadronRoster, selectSelectedAirmanIds],
  (squadronRoster, selectedAirmanIds) =>
    squadronRoster
      .map((r) => r.airman)
      .filter((a) => selectedAirmanIds.includes(a.uid))
);

export default dashboardSlice.reducer;
