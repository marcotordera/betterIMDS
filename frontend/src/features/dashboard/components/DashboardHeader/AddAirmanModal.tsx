import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  Chip,
  Alert,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShieldIcon from '@mui/icons-material/Shield';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  closeAddAirmanModal,
  addAirman,
  selectIsAddAirmanModalOpen,
  selectSelectedSquadron,
} from '../../dashboardSlice';
import { SQUADRON_MAP } from '../../mockData';
import { ComplianceStatus } from '@/types/utm';

const AF_RANKS = [
  'AB', 'Amn', 'A1C', 'SrA', 'SSgt', 'TSgt', 'MSgt', 'SMSgt', 'CMSgt',
  '2nd Lt', '1st Lt', 'Capt', 'Maj', 'Lt Col', 'Col',
];

export default function AddAirmanModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsAddAirmanModalOpen);
  const viewingSquadron = useAppSelector(selectSelectedSquadron);
  const targetSquadronId = SQUADRON_MAP[viewingSquadron] || 1;

  const [rank, setRank] = useState('SrA');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [edipi, setEdipi] = useState('');
  const [email, setEmail] = useState('');
  const [initialStatus, setInitialStatus] = useState<ComplianceStatus>('EXPIRING');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setRank('SrA');
      setFirstName('');
      setLastName('');
      // Generate a realistic 10-digit EDIPI
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      setEdipi(`1035${randomSuffix}`);
      setEmail('');
      setInitialStatus('EXPIRING');
      setError(null);
    }
  }, [isOpen]);

  const handleFirstNameChange = (val: string) => {
    setFirstName(val);
    if (val && lastName) {
      setEmail(`${val.trim().toLowerCase()}.${lastName.trim().toLowerCase()}@test.com`);
    }
  };

  const handleLastNameChange = (val: string) => {
    setLastName(val);
    if (firstName && val) {
      setEmail(`${firstName.trim().toLowerCase()}.${val.trim().toLowerCase()}@test.com`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError('First name and Last name are required.');
      return;
    }
    if (!edipi.trim() || edipi.trim().length !== 10) {
      setError('DoD EDIPI must be exactly 10 digits.');
      return;
    }
    const finalEmail = email.trim() || `${firstName.trim().toLowerCase()}.${lastName.trim().toLowerCase()}@test.com`;

    dispatch(
      addAirman({
        airman: {
          rank,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          edipi: edipi.trim(),
          email: finalEmail,
          squadronId: targetSquadronId,
        },
        initialStatus,
      })
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(closeAddAirmanModal())}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 700 }}>
        <PersonAddIcon color="primary" />
        <Box>
          <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
            Add Airman to Unit
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Assigning to Viewing Unit: <strong>{viewingSquadron}</strong>
          </Typography>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>}

          {/* Unit Assignment Banner */}
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: 'action.hover',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShieldIcon color="primary" fontSize="small" />
              <Typography variant="body2" fontWeight={600}>
                Assigned Squadron:
              </Typography>
            </Box>
            <Chip label={viewingSquadron} color="primary" size="small" sx={{ fontWeight: 700 }} />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="Air Force Rank"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                size="small"
              >
                {AF_RANKS.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="First Name"
                value={firstName}
                onChange={(e) => handleFirstNameChange(e.target.value)}
                size="small"
                required
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={(e) => handleLastNameChange(e.target.value)}
                size="small"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="DoD EDIPI (10-digits)"
                value={edipi}
                onChange={(e) => setEdipi(e.target.value.replace(/\D/g, '').slice(0, 10))}
                size="small"
                required
                helperText="10-digit Department of Defense ID"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Official Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                helperText="test.mil / af.mil address"
              />
            </Grid>
          </Grid>

          {/* Initial Training Readiness Baseline */}
          <Box>
            <Typography
              variant="caption"
              sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'text.secondary', display: 'block', mb: 0.5 }}
            >
              Initial Training Status Baseline
            </Typography>
            <RadioGroup
              row
              value={initialStatus}
              onChange={(e) => setInitialStatus(e.target.value as ComplianceStatus)}
            >
              <FormControlLabel
                value="EXPIRING"
                control={<Radio size="small" color="warning" />}
                label={<Typography variant="body2">Initiate Baseline (Due in 30 Days)</Typography>}
              />
              <FormControlLabel
                value="OVERDUE"
                control={<Radio size="small" color="error" />}
                label={<Typography variant="body2">Immediate In-Processing (Overdue)</Typography>}
              />
              <FormControlLabel
                value="VALID"
                control={<Radio size="small" color="success" />}
                label={<Typography variant="body2">Fully Current (1 Year)</Typography>}
              />
            </RadioGroup>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, px: 3, justifyContent: 'space-between' }}>
          <Button onClick={() => dispatch(closeAddAirmanModal())} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" startIcon={<PersonAddIcon />}>
            Add Airman
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
