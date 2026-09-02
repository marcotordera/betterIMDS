import { Box, Card, CardContent, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { DashboardMetrics } from '../../../types/utm';

interface Props {
  metrics: DashboardMetrics;
}

export default function MetricCards({ metrics }: Props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
        gap: 2.5,
        mb: 4,
      }}
    >
      {/* 1. Overall Readiness */}
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Overall Readiness
            </Typography>
            <Typography variant="h4" fontWeight={700} color="success.main">
              {metrics.readinessPercentage}%
            </Typography>
          </Box>
          <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'success.light', color: 'success.dark', opacity: 0.85 }}>
            <TrendingUpIcon fontSize="large" />
          </Box>
        </CardContent>
      </Card>

      {/* 2. Total Roster */}
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Total Roster
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              {metrics.totalAirmen} <Typography component="span" variant="h6" color="text.secondary">Airmen</Typography>
            </Typography>
          </Box>
          <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'primary.light', color: 'primary.dark', opacity: 0.85 }}>
            <PeopleIcon fontSize="large" />
          </Box>
        </CardContent>
      </Card>

      {/* 3. Overdue CBTs */}
      <Card variant="outlined" sx={{ borderRadius: 2, borderColor: metrics.overdueCount > 0 ? 'error.main' : 'divider' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Overdue CBTs
            </Typography>
            <Typography variant="h4" fontWeight={700} color={metrics.overdueCount > 0 ? 'error.main' : 'text.primary'}>
              {metrics.overdueCount}
            </Typography>
          </Box>
          <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'error.light', color: 'error.dark', opacity: 0.85 }}>
            <ErrorOutlineIcon fontSize="large" />
          </Box>
        </CardContent>
      </Card>

      {/* 4. Expiring in 30 Days */}
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Expiring (30 Days)
            </Typography>
            <Typography variant="h4" fontWeight={700} color="warning.main">
              {metrics.expiringCount}
            </Typography>
          </Box>
          <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'warning.light', color: 'warning.dark', opacity: 0.85 }}>
            <WarningAmberIcon fontSize="large" />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
