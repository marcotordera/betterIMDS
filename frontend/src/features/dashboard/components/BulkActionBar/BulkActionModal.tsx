import { useState } from 'react';
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
  Alert,
  Paper,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  closeBulkModal,
  bulkLogCompletion,
  bulkGrantExemption,
  bulkInvalidateCompletion,
  clearSelection,
  selectActiveBulkModal,
  selectSelectedAirmen,
} from '../../dashboardSlice';
import { COURSES } from '../../mockData';

export default function BulkActionModal() {
  const dispatch = useAppDispatch();
  const { open, actionType } = useAppSelector(selectActiveBulkModal);
  const selectedAirmen = useAppSelector(selectSelectedAirmen);

  const [targetCourse, setTargetCourse] = useState<string>('ALL_COURSES');
  const [completedDate, setCompletedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [exemptionReason, setExemptionReason] = useState<string>('');

  if (!open || !actionType) return null;

  const handleClose = () => {
    dispatch(closeBulkModal());
  };

  const handleSubmit = () => {
    const airmanIds = selectedAirmen.map((a) => a.uid);
    const courseCodes =
      targetCourse === 'ALL_COURSES'
        ? COURSES.map((c) => c.courseCode)
        : [targetCourse];

    if (actionType === 'VALID') {
      dispatch(bulkLogCompletion({ airmanIds, courseCodes, completedDate }));
    } else if (actionType === 'WAIVER') {
      const reason = exemptionReason.trim() || 'Approved Bulk Exemption / Waiver';
      dispatch(bulkGrantExemption({ airmanIds, courseCodes, reason }));
    } else if (actionType === 'OVERDUE') {
      dispatch(bulkInvalidateCompletion({ airmanIds, courseCodes }));
    }

    dispatch(clearSelection());
    dispatch(closeBulkModal());
  };

  const isComplete = actionType === 'VALID';
  const isExempt = actionType === 'WAIVER';
  const isInvalidate = actionType === 'OVERDUE';

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        {isComplete && <CheckCircleOutlineIcon color="success" />}
        {isExempt && <ShieldOutlinedIcon color="secondary" />}
        {isInvalidate && <HighlightOffIcon color="error" />}

        {isComplete && 'Bulk Log Course Completion'}
        {isExempt && 'Bulk Grant Exemption / Waiver'}
        {isInvalidate && 'Bulk Invalidate Course Completion'}
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        {/* Selected Airmen Summary Banner */}
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            mb: 2.5,
            borderRadius: 2,
            bgcolor: 'action.hover',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Target: {selectedAirmen.length} Selected Airm{selectedAirmen.length === 1 ? 'an' : 'en'}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            sx={{ maxHeight: 100, overflowY: 'auto' }}
          >
            {selectedAirmen.map((a) => (
              <Chip
                key={a.uid}
                label={`${a.rank} ${a.lastName}`}
                size="small"
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
            ))}
          </Stack>
        </Paper>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Target Course Selector */}
          <TextField
            select
            label="Target Course(s)"
            value={targetCourse}
            onChange={(e) => setTargetCourse(e.target.value)}
            fullWidth
            helperText="Choose whether to apply this action to a specific course or all CBT courses"
          >
            <MenuItem value="ALL_COURSES" sx={{ fontWeight: 700, color: 'primary.main' }}>
              ⚡ All CBT Courses ({COURSES.length} Courses)
            </MenuItem>
            {COURSES.map((c) => (
              <MenuItem key={c.courseCode} value={c.courseCode}>
                {c.courseCode} - {c.courseTitle}
              </MenuItem>
            ))}
          </TextField>

          {/* 1. Log Completion Form */}
          {isComplete && (
            <TextField
              type="date"
              label="Completion Date"
              value={completedDate}
              onChange={(e) => setCompletedDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              helperText="Certifications will be marked valid for 1 year from this date"
            />
          )}

          {/* 2. Exemption / Waiver Form */}
          {isExempt && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Alert severity="info" sx={{ fontSize: '0.85rem' }}>
                Exemptions count towards squadron readiness compliance without requiring course completions.
              </Alert>
              <TextField
                label="Exemption Description & Justification"
                placeholder="e.g. Unit deployment to Kadena AB, Medical profile..."
                value={exemptionReason}
                onChange={(e) => setExemptionReason(e.target.value)}
                multiline
                rows={3}
                fullWidth
                autoFocus
              />
            </Box>
          )}

          {/* 3. Invalidate Form */}
          {isInvalidate && (
            <Alert severity="error" sx={{ fontSize: '0.85rem' }}>
              <strong>Caution:</strong> This will revoke completions for all {selectedAirmen.length} selected Airmen on the chosen course(s) and mark them as <strong>OVERDUE</strong>.
            </Alert>
          )}
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2, px: 3, justifyContent: 'space-between' }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>

        {isComplete && (
          <Button onClick={handleSubmit} variant="contained" color="success">
            Apply Bulk Completion
          </Button>
        )}

        {isExempt && (
          <Button onClick={handleSubmit} variant="contained" color="secondary">
            Apply Bulk Exemption
          </Button>
        )}

        {isInvalidate && (
          <Button onClick={handleSubmit} variant="contained" color="error">
            Confirm Bulk Invalidation
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
