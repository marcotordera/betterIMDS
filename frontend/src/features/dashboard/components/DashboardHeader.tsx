import { Box, Typography } from '@mui/material';
import { useAppSelector } from '@/app/hooks';
import { selectSelectedSquadron } from '../dashboardSlice';

export default function DashboardHeader() {
  const selectedSquadron = useAppSelector(selectSelectedSquadron);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Unit Training Management Matrix
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Air Force Ancillary & CBT Compliance Tracker • Viewing{' '}
        <strong>{selectedSquadron}</strong>
      </Typography>
    </Box>
  );
}
