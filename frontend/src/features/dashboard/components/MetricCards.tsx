import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useAppSelector } from '@/app/hooks';
import { selectDashboardMetrics } from '../dashboardSlice';

interface MetricItemProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  colorScheme: 'success' | 'primary' | 'error' | 'warning';
  isAlert?: boolean;
}

function MetricCardItem({ title, value, icon, colorScheme, isAlert }: MetricItemProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        borderColor: isAlert ? `${colorScheme}.main` : 'divider',
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {title}
          </Typography>
          <Typography
            variant="h4"
            fontWeight={700}
            color={colorScheme !== 'primary' ? `${colorScheme}.main` : 'text.primary'}
          >
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: `${colorScheme}.light`,
            color: `${colorScheme}.dark`,
            opacity: 0.85,
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function MetricCards() {
  const metrics = useAppSelector(selectDashboardMetrics);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
        gap: 2.5,
        mb: 4,
      }}
    >
      <MetricCardItem
        title="Overall Readiness"
        value={`${metrics.readinessPercentage}%`}
        icon={<TrendingUpIcon fontSize="large" />}
        colorScheme="success"
      />

      <MetricCardItem
        title="Total Roster"
        value={
          <>
            {metrics.totalAirmen}{' '}
            <Typography component="span" variant="h6" color="text.secondary">
              Airmen
            </Typography>
          </>
        }
        icon={<PeopleIcon fontSize="large" />}
        colorScheme="primary"
      />

      <MetricCardItem
        title="Overdue CBTs"
        value={metrics.overdueCount}
        icon={<ErrorOutlineIcon fontSize="large" />}
        colorScheme="error"
        isAlert={metrics.overdueCount > 0}
      />

      <MetricCardItem
        title="Expiring (30 Days)"
        value={metrics.expiringCount}
        icon={<WarningAmberIcon fontSize="large" />}
        colorScheme="warning"
      />
    </Box>
  );
}
