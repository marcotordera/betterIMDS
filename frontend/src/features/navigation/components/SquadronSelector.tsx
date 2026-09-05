import { Box, Typography, Select, MenuItem, Chip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setSelectedSquadron, selectSelectedSquadron } from '@/features/dashboard';

const SQUADRONS = ['35 MXS', '35 AMXS', '35 CES', '35 FSS', '35 MXG', '35 FW'];

export default function SquadronSelector() {
  const dispatch = useAppDispatch();
  const selectedSquadron = useAppSelector(selectSelectedSquadron);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const isWingUtm = currentUser?.role === 'WING_UTM';

  if (!isWingUtm) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          Squadron:
        </Typography>
        <Chip
          label={currentUser?.defaultSquadron || selectedSquadron}
          size="small"
          variant="outlined"
          sx={{ fontWeight: 700, borderColor: 'divider' }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" color="text.secondary" fontWeight={500}>
        Squadron:
      </Typography>
      <Select
        size="small"
        value={selectedSquadron}
        onChange={(e) => dispatch(setSelectedSquadron(e.target.value))}
        sx={{ minWidth: 130, fontWeight: 600 }}
      >
        {SQUADRONS.map((sq) => (
          <MenuItem key={sq} value={sq}>
            {sq}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
