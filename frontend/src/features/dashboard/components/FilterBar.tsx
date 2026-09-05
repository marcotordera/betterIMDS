import { Box, Chip, Stack, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setStatusFilter, selectStatusFilter } from '../dashboardSlice';

const FILTER_OPTIONS = [
  { value: 'ALL', label: 'All Statuses' },
  { value: 'OVERDUE', label: 'Overdue Only' },
  { value: 'EXPIRING', label: 'Expiring Soon' },
  { value: 'WAIVER', label: 'Waivers / Exemptions' },
];

export default function FilterBar() {
  const dispatch = useAppDispatch();
  const statusFilter = useAppSelector(selectStatusFilter);

  return (
    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'text.secondary' }}>
        <FilterListIcon fontSize="small" />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Filter Status:
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {FILTER_OPTIONS.map((opt) => {
          const isSelected = statusFilter === opt.value;
          return (
            <Chip
              key={opt.value}
              label={opt.label}
              clickable
              color={isSelected ? 'primary' : 'default'}
              variant={isSelected ? 'filled' : 'outlined'}
              size="small"
              onClick={() =>
                dispatch(setStatusFilter(opt.value as 'ALL' | 'OVERDUE' | 'EXPIRING' | 'WAIVER'))
              }
              sx={{
                fontWeight: isSelected ? 700 : 500,
                fontSize: '0.8rem',
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
