import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectSelectedAirmanIds,
  selectSelectedSquadron,
  setSquadronRosterFromApi,
} from './dashboardSlice';
import { SQUADRON_MAP } from './mockData';
import { fetchDashboardMatrixApi } from '@/api/client';
import DashboardHeader from './components/DashboardHeader';
import MetricCards from './components/MetricCards';
import FilterBar from './components/FilterBar';
import ComplianceTable from './components/ComplianceTable';
import BulkActionBar from './components/BulkActionBar';

export default function UtmDashboard() {
  const dispatch = useAppDispatch();
  const selectedSquadron = useAppSelector(selectSelectedSquadron);
  const selectedAirmanIds = useAppSelector(selectSelectedAirmanIds);

  useEffect(() => {
    const squadronId = SQUADRON_MAP[selectedSquadron] || 1;
    let isCancelled = false;

    fetchDashboardMatrixApi(squadronId)
      .then((data) => {
        if (!isCancelled && data && data.roster) {
          dispatch(setSquadronRosterFromApi({ squadronId, roster: data.roster }));
        }
      })
      .catch((_err) => {
        // Fallback to initial local state when backend is offline
      });

    return () => {
      isCancelled = true;
    };
  }, [dispatch, selectedSquadron]);

  return (
    <Box sx={{ pb: selectedAirmanIds.length > 0 ? 10 : 2 }}>
      {/* 1. Header (Owns AddAirmanModal child) */}
      <DashboardHeader />

      {/* 2. Top KPI Metric Summary Cards */}
      <MetricCards />

      {/* 3. Status Filter Chips */}
      <FilterBar />

      {/* 4. Interactive Compliance Matrix Table (Owns StatusBadge, LogCompletionModal, AirmanProfileModal) */}
      <ComplianceTable />

      {/* 5. Floating Bulk Action Toolbar (Owns BulkActionModal child) */}
      <BulkActionBar />
    </Box>
  );
}
