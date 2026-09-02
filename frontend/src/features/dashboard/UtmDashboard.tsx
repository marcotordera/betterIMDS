import { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logCompletion } from './state/utmSlice';
import DashboardHeader from './components/DashboardHeader';
import MetricCards from './components/MetricCards';
import FilterBar from './components/FilterBar';
import ComplianceTable from './components/ComplianceTable';
import LogCompletionModal from './components/LogCompletionModal';
import { COURSES, SQUADRON_MAP, calculateMetrics } from './data/mockData';

export default function UtmDashboard() {
  const dispatch = useAppDispatch();

  // 1. Read Global State from Redux
  const selectedSquadron = useAppSelector((state) => state.utm.selectedSquadron);
  const roster = useAppSelector((state) => state.utm.roster);
  const searchQuery = useAppSelector((state) => state.utm.searchQuery);
  const statusFilter = useAppSelector((state) => state.utm.statusFilter);

  // 2. Modal Target State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState<{ airmanId?: number; courseCode?: string }>({});

  // 3. Filter roster strictly to active Squadron
  const targetSquadronId = SQUADRON_MAP[selectedSquadron] || 1;
  const squadronRoster = useMemo(() => {
    return roster.filter((row) => row.airman.squadronId === targetSquadronId);
  }, [roster, targetSquadronId]);

  // 4. Calculate live metrics for this squadron
  const metrics = useMemo(() => calculateMetrics(squadronRoster), [squadronRoster]);
  const airmenList = useMemo(() => squadronRoster.map((r) => r.airman), [squadronRoster]);

  // 5. Search & Status Filtering
  const filteredRoster = useMemo(() => {
    return squadronRoster.filter((row) => {
      const fullName = `${row.airman.firstName} ${row.airman.lastName}`.toLowerCase();
      const edipi = row.airman.edipi.toLowerCase();
      const query = searchQuery.toLowerCase();
      const matchesSearch = fullName.includes(query) || edipi.includes(query);

      if (!matchesSearch) return false;
      if (statusFilter === 'ALL') return true;
      return Object.values(row.courses).some((detail) => detail.status === statusFilter);
    });
  }, [squadronRoster, searchQuery, statusFilter]);

  // 6. Action Handlers
  const handleCellClick = (airmanId: number, courseCode: string) => {
    setModalTarget({ airmanId, courseCode });
    setModalOpen(true);
  };

  const handleSaveCompletion = (airmanId: number, courseCode: string, completedDate: string) => {
    dispatch(logCompletion({ airmanId, courseCode, completedDate }));
  };

  return (
    <Box>
      {/* 1. Header with Squadron Title & Log Button */}
      <DashboardHeader onOpenModal={() => { setModalTarget({}); setModalOpen(true); }} />

      {/* 2. Top KPI Metric Summary Cards */}
      <MetricCards metrics={metrics} />

      {/* 3. Search & Filter Bar */}
      <FilterBar
        overdueCount={metrics.overdueCount}
        expiringCount={metrics.expiringCount}
        waiverCount={metrics.waiverCount}
      />

      {/* 4. Interactive Compliance Matrix Table */}
      <ComplianceTable
        roster={filteredRoster}
        selectedSquadron={selectedSquadron}
        onCellClick={handleCellClick}
      />

      {/* 5. Log Completion Modal Dialog */}
      <LogCompletionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        airmen={airmenList}
        courses={COURSES}
        initialAirmanId={modalTarget.airmanId}
        initialCourseCode={modalTarget.courseCode}
        onSave={handleSaveCompletion}
      />
    </Box>
  );
}
