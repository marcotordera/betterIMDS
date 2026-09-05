import { Box, Chip, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ShieldIcon from '@mui/icons-material/Shield';
import { StatusDetail } from '@/types/utm';

interface Props {
  detail?: StatusDetail;
  onClick: () => void;
}

export default function StatusBadge({ detail, onClick }: Props) {
  if (!detail) {
    return (
      <Chip
        label="N/A"
        size="small"
        variant="outlined"
        onClick={onClick}
        sx={{ cursor: 'pointer', opacity: 0.6 }}
      />
    );
  }

  const { status, expirationDate, reason } = detail;

  let label: string = status;
  let color: 'success' | 'warning' | 'error' | 'secondary' = 'error';
  let icon = <ErrorOutlineIcon fontSize="small" />;
  let tooltipText = 'Status: Overdue. Click to log completion or grant exemption.';

  if (status === 'VALID') {
    label = 'Valid';
    color = 'success';
    icon = <CheckCircleIcon fontSize="small" />;
    tooltipText = expirationDate ? `Valid until: ${expirationDate}` : 'Training Valid';
  } else if (status === 'EXPIRING') {
    label = 'Expiring';
    color = 'warning';
    icon = <WarningAmberIcon fontSize="small" />;
    tooltipText = expirationDate ? `Expires soon: ${expirationDate}` : 'Expiring soon';
  } else if (status === 'WAIVER') {
    label = 'Exempt';
    color = 'secondary';
    icon = <ShieldIcon fontSize="small" />;
    tooltipText = reason ? `Exemption / Waiver: ${reason}` : 'Exemption on file';
  }

  return (
    <Tooltip title={tooltipText} arrow placement="top">
      <Box component="span" sx={{ display: 'inline-block' }}>
        <Chip
          label={label}
          color={color}
          size="small"
          icon={icon}
          onClick={onClick}
          sx={{
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.75rem',
            minWidth: 85,
            justifyContent: 'center',
            '& .MuiChip-label': {
              px: 0.75,
            },
            '&:hover': {
              filter: 'brightness(1.1)',
              transform: 'scale(1.03)',
              boxShadow: 1,
            },
            transition: 'all 0.15s ease',
          }}
        />
      </Box>
    </Tooltip>
  );
}
