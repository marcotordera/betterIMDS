import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AirmanMatrixRow, ComplianceStatus } from '../../../types/utm';
import { INITIAL_ROSTER } from '../data/mockData';

export interface UtmState {
  selectedSquadron: string;
  darkMode: boolean;
  searchQuery: string;
  statusFilter: 'ALL' | 'OVERDUE' | 'EXPIRING' | 'WAIVER';
  roster: AirmanMatrixRow[];
}

const initialState: UtmState = {
  selectedSquadron: '35 MXS',
  darkMode: false,
  searchQuery: '',
  statusFilter: 'ALL',
  roster: INITIAL_ROSTER,
};

export const utmSlice = createSlice({
  name: 'utm',
  initialState,
  reducers: {
    // 1. Change Active Squadron
    setSelectedSquadron: (state, action: PayloadAction<string>) => {
      state.selectedSquadron = action.payload;
    },

    // 2. Toggle Dark / Light Theme
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },

    // 3. Search Filter
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    // 4. Status Chip Filter
    setStatusFilter: (state, action: PayloadAction<'ALL' | 'OVERDUE' | 'EXPIRING' | 'WAIVER'>) => {
      state.statusFilter = action.payload;
    },

    // 5. Log Course Completion for an Airman
    logCompletion: (
      state,
      action: PayloadAction<{ airmanId: number; courseCode: string; completedDate: string }>
    ) => {
      const { airmanId, courseCode, completedDate } = action.payload;

      // Expiration = 1 year later
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
    },
  },
});

export const {
  setSelectedSquadron,
  toggleDarkMode,
  setSearchQuery,
  setStatusFilter,
  logCompletion,
} = utmSlice.actions;

export default utmSlice.reducer;
