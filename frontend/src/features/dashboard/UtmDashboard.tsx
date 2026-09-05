import { Box } from '@mui/material';
import { useAppSelector } from '@/app/hooks';
import { selectSelectedAirmanIds } from './dashboardSlice';
import DashboardHeader from './components/DashboardHeader';
import MetricCards from './components/MetricCards';
import FilterBar from './components/FilterBar';
import ComplianceTable from './components/ComplianceTable';
import BulkActionBar from './components/BulkActionBar';
import BulkActionModal from './components/BulkActionModal';
import LogCompletionModal from './components/LogCompletionModal';
import AirmanProfileModal from './components/AirmanProfileModal';

export default function UtmDashboard() {
  const selectedAirmanIds = useAppSelector(selectSelectedAirmanIds);

  return (
    <Box sx={{ pb: selectedAirmanIds.length > 0 ? 10 : 2 }}>
      {/* 1. Header with Squadron Title */}
      <DashboardHeader />

      {/* 2. Top KPI Metric Summary Cards */}
      <MetricCards />

      {/* 3. Status Filter Chips */}
      <FilterBar />

      {/* 4. Interactive Compliance Matrix Table */}
      <ComplianceTable />

      {/* 5. Floating Bulk Action Toolbar */}
      <BulkActionBar />

      {/* 6. Bulk Action Modal */}
      <BulkActionModal />

      {/* 7. Individual Log & Manage Status Modal Dialog */}
      <LogCompletionModal />

      {/* 8. Airman Individual Training Record & Printable RIP Modal */}
      <AirmanProfileModal />
    </Box>
  );
}
