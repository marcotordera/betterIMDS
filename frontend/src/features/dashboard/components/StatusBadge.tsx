import { Chip, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ShieldIcon from '@mui/icons-material/Shield';
import { StatusDetail } from '../../../types/utm';

interface Props {
  detail?: StatusDetail;
  onClick?: () => void;
}

export default function StatusBadge({ detail, onClick }: Props) {
  if (!detail) {
    return <Chip label="N/A" size="small" variant="outlined" sx={{ opacity: 0.5 }} />;
  }

  const { status, expirationDate, reason } = detail;

  if (status === 'VALID') {
    return (
      <Tooltip title={`Expires: ${expirationDate || 'N/A'}`}>
        <Chip
          icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
          label="Valid"
          size="small"
          color="success"
          onClick={onClick}
          sx={{ fontWeight: 600, cursor: onClick ? 'pointer' : 'default' }}
        />
      </Tooltip>
    );
  }

  if (status === 'EXPIRING') {
    return (
      <Tooltip title={`Expiring Soon: ${expirationDate || 'Within 30 days'}`}>
        <Chip
          icon={<WarningAmberIcon sx={{ fontSize: 16 }} />}
          label="Expiring"
          size="small"
          color="warning"
          onClick={onClick}
          sx={{ fontWeight: 600, cursor: onClick ? 'pointer' : 'default' }}
        />
      </Tooltip>
    );
  }

  if (status === 'OVERDUE') {
    return (
      <Tooltip title="OVERDUE! Click to log completion">
        <Chip
          icon={<ErrorOutlineIcon sx={{ fontSize: 16 }} />}
          label="OVERDUE"
          size="small"
          color="error"
          onClick={onClick}
          sx={{ fontWeight: 700, cursor: onClick ? 'pointer' : 'default' }}
        />
      </Tooltip>
    );
  }

  if (status === 'WAIVER') {
    return (
      <Tooltip title={`Waiver/Exemption: ${reason || 'Approved profile'}`}>
        <Chip
          icon={<ShieldIcon sx={{ fontSize: 16 }} />}
          label="WAIVER"
          size="small"
          color="secondary"
          onClick={onClick}
          sx={{ fontWeight: 600, cursor: onClick ? 'pointer' : 'default' }}
        />
      </Tooltip>
    );
  }

  return <Chip label={status} size="small" />;
}
