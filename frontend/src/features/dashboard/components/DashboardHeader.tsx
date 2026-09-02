import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector } from '../../../app/hooks';

interface Props {
  onOpenModal: () => void;
}

export default function DashboardHeader({ onOpenModal }: Props) {
  const selectedSquadron = useAppSelector((state) => state.utm.selectedSquadron);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight={700}>
          {selectedSquadron} Compliance Matrix
        </Typography>
        <Typography variant="body2" color="text.secondary">
          PACAF Mandatory Annual Computer-Based Training (CBT) Dashboard
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onOpenModal}
        sx={{ fontWeight: 600, borderRadius: 2 }}
      >
        Log Completion
      </Button>
    </Box>
  );
}
