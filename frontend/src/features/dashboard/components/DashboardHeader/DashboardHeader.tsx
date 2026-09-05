import { Box, Typography, Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectSelectedSquadron, openAddAirmanModal } from '../../dashboardSlice';
import AddAirmanModal from './AddAirmanModal';

export default function DashboardHeader() {
  const dispatch = useAppDispatch();
  const selectedSquadron = useAppSelector(selectSelectedSquadron);

  return (
    <Box
      sx={{
        mb: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Unit Training Management Matrix
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Air Force Ancillary & CBT Compliance Tracker • Viewing{' '}
          <strong>{selectedSquadron}</strong>
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        startIcon={<PersonAddIcon />}
        onClick={() => dispatch(openAddAirmanModal())}
        sx={{
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: 2,
          px: 2.5,
          py: 1,
          boxShadow: 2,
        }}
      >
        Add Airman to {selectedSquadron}
      </Button>

      {/* Child Modal */}
      <AddAirmanModal />
    </Box>
  );
}
