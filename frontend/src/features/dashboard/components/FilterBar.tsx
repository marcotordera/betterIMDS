import { Paper, TextField, InputAdornment, Box, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setSearchQuery, setStatusFilter } from '../state/utmSlice';

interface Props {
  overdueCount: number;
  expiringCount: number;
  waiverCount: number;
}

export default function FilterBar({ overdueCount, expiringCount, waiverCount }: Props) {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.utm.searchQuery);
  const statusFilter = useAppSelector((state) => state.utm.statusFilter);

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      {/* Search by Name / EDIPI */}
      <TextField
        placeholder="Search by Airman Name or EDIPI..."
        size="small"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        sx={{ minWidth: 280 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" color="action" />
            </InputAdornment>
          ),
        }}
      />

      {/* Filter Status Chips */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip
          label="All Airmen"
          clickable
          color={statusFilter === 'ALL' ? 'primary' : 'default'}
          onClick={() => dispatch(setStatusFilter('ALL'))}
          size="small"
        />
        <Chip
          label={`Overdue (${overdueCount})`}
          clickable
          color={statusFilter === 'OVERDUE' ? 'error' : 'default'}
          onClick={() => dispatch(setStatusFilter('OVERDUE'))}
          size="small"
        />
        <Chip
          label={`Expiring (${expiringCount})`}
          clickable
          color={statusFilter === 'EXPIRING' ? 'warning' : 'default'}
          onClick={() => dispatch(setStatusFilter('EXPIRING'))}
          size="small"
        />
        <Chip
          label={`Waivers (${waiverCount})`}
          clickable
          color={statusFilter === 'WAIVER' ? 'secondary' : 'default'}
          onClick={() => dispatch(setStatusFilter('WAIVER'))}
          size="small"
        />
      </Box>
    </Paper>
  );
}
