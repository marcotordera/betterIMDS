import { Box } from '@mui/material';
import { useAppSelector } from '@/app/hooks';
import { selectSelectedAirmanIds } from './dashboardSlice';
import DashboardHeader from './components/DashboardHeader';
import MetricCards from './components/MetricCards';
import FilterBar from './components/FilterBar';
import ComplianceTable from './components/ComplianceTable';
import BulkActionBar from './components/BulkActionBar';

export default function UtmDashboard() {
  const selectedAirmanIds = useAppSelector(selectSelectedAirmanIds);

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
