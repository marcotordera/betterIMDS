import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Tabs,
  Tab,
  Alert,
  Paper,
  Divider,
  Chip,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  closeCellModal,
  logCompletion,
  grantExemption,
  invalidateCompletion,
  selectActiveCellModal,
  selectRoster,
} from '../../dashboardSlice';
import { COURSES } from '../../mockData';

export default function LogCompletionModal() {
  const dispatch = useAppDispatch();
  const { open, airmanId, courseCode } = useAppSelector(selectActiveCellModal);
  const roster = useAppSelector(selectRoster);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [completedDate, setCompletedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [customReason, setCustomReason] = useState<string>('');

  const row = roster.find((r) => r.airman.uid === airmanId);
  const selectedAirman = row?.airman;
  const selectedCourse = COURSES.find((c) => c.courseCode === courseCode);
  const currentDetail = courseCode && row ? row.courses[courseCode] : undefined;

  useEffect(() => {
    if (currentDetail?.status === 'WAIVER') {
      setTabIndex(1);
      setCustomReason(currentDetail.reason || '');
    } else {
      setTabIndex(0);
      setCustomReason('');
    }
    setCompletedDate(currentDetail?.completedDate || new Date().toISOString().split('T')[0]);
  }, [airmanId, courseCode, currentDetail]);

  if (!open || !airmanId || !courseCode) return null;

  const handleClose = () => {
    dispatch(closeCellModal());
  };

  const handleSaveCompletion = () => {
    dispatch(logCompletion({ airmanId, courseCode, completedDate }));
    handleClose();
  };

  const handleGrantExemption = () => {
    const finalReason = customReason.trim() || 'Approved Exemption / Waiver';
    dispatch(grantExemption({ airmanId, courseCode, reason: finalReason }));
    handleClose();
  };

  const handleInvalidate = () => {
    dispatch(invalidateCompletion({ airmanId, courseCode }));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
        Manage Course Training Status
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        {/* Selected Airman & Course Info Banner */}
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            mb: 2.5,
            borderRadius: 2,
            bgcolor: 'action.hover',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {selectedAirman
                ? `${selectedAirman.rank} ${selectedAirman.lastName}, ${selectedAirman.firstName}`
                : 'Airman'}
            </Typography>
            {currentDetail && (
              <Chip
                label={currentDetail.status}
                size="small"
                color={
                  currentDetail.status === 'VALID'
                    ? 'success'
                    : currentDetail.status === 'EXPIRING'
                      ? 'warning'
                      : currentDetail.status === 'WAIVER'
                        ? 'secondary'
                        : 'error'
                }
                sx={{ fontWeight: 700, fontSize: '0.75rem' }}
              />
            )}
          </Box>
          <Typography variant="caption" color="text.secondary">
            EDIPI: {selectedAirman?.edipi || 'N/A'} • Course: {selectedCourse?.courseCode} (
            {selectedCourse?.courseTitle})
          </Typography>
          {currentDetail?.expirationDate && (
            <Typography variant="caption" color="text.secondary">
              Current Expiration: <strong>{currentDetail.expirationDate}</strong>
            </Typography>
          )}
          {currentDetail?.reason && (
            <Typography variant="caption" color="secondary.main">
              Existing Exemption Note: <em>{currentDetail.reason}</em>
            </Typography>
          )}
        </Paper>

        {/* Action Tabs */}
        <Tabs
          value={tabIndex}
          onChange={(_, val) => setTabIndex(val)}
          variant="fullWidth"
          sx={{ mb: 2.5, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab
            icon={<CheckCircleOutlineIcon fontSize="small" />}
            iconPosition="start"
            label="Log Valid"
            sx={{ textTransform: 'none', fontWeight: 600 }}
          />
          <Tab
            icon={<ShieldOutlinedIcon fontSize="small" />}
            iconPosition="start"
            label="Exempt / Waiver"
            sx={{ textTransform: 'none', fontWeight: 600 }}
          />
          <Tab
            icon={<HighlightOffIcon fontSize="small" />}
            iconPosition="start"
            label="Invalidate"
            sx={{ textTransform: 'none', fontWeight: 600, color: 'error.main' }}
          />
        </Tabs>

        {/* TAB 0: LOG COMPLETION */}
        {tabIndex === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Record training completion. The certification will be valid for 1 year from the completion date.
            </Typography>

            <TextField
              type="date"
              label="Completion Date"
              value={completedDate}
              onChange={(e) => setCompletedDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        )}

        {/* TAB 1: GRANT EXEMPTION / WAIVER */}
        {tabIndex === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Alert severity="info" sx={{ py: 0.5, fontSize: '0.85rem' }}>
              Exemptions and waivers count towards squadron compliance readiness without requiring standard course completion.
            </Alert>

            <TextField
              label="Exemption / Waiver Description & Justification"
              placeholder="e.g. Medical profile - respiratory mask fit waiver through Q4, TDY to Kadena AB..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              multiline
              rows={3}
              fullWidth
              autoFocus
            />
          </Box>
        )}

        {/* TAB 2: INVALIDATE COMPLETION */}
        {tabIndex === 2 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Alert severity="error" sx={{ fontSize: '0.85rem' }}>
              <strong>Caution:</strong> Invalidating or revoking completion will immediately flag this requirement as{' '}
              <strong>OVERDUE</strong> for the Airman and lower the squadron&apos;s readiness percentage.
            </Alert>
            <Typography variant="body2" color="text.secondary">
              Use this action if a course certificate was submitted in error, failed verification, or an exemption was cancelled.
            </Typography>
          </Box>
        )}
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2, px: 3, justifyContent: 'space-between' }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>

        {tabIndex === 0 && (
          <Button onClick={handleSaveCompletion} variant="contained" color="primary">
            Save Completion
          </Button>
        )}

        {tabIndex === 1 && (
          <Button onClick={handleGrantExemption} variant="contained" color="secondary">
            Grant Exemption
          </Button>
        )}

        {tabIndex === 2 && (
          <Button onClick={handleInvalidate} variant="contained" color="error">
            Invalidate Completion
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
