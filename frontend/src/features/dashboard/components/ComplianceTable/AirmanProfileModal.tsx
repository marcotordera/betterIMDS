import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Chip,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  closeAirmanProfileModal,
  selectActiveAirmanProfileModal,
  selectActiveAirmanRow,
  selectSelectedSquadron,
} from '../../dashboardSlice';
import { COURSES } from '../../mockData';
import StatusBadge from './StatusBadge';

export default function AirmanProfileModal() {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(selectActiveAirmanProfileModal);
  const activeRow = useAppSelector(selectActiveAirmanRow);
  const selectedSquadron = useAppSelector(selectSelectedSquadron);

  if (!open || !activeRow) return null;

  const { airman, courses } = activeRow;
  const totalCourses = COURSES.length;
  const validCount = COURSES.filter((c) => {
    const s = courses[c.courseCode]?.status;
    return s === 'VALID' || s === 'WAIVER';
  }).length;
  const compliancePct = Math.round((validCount / totalCourses) * 100);

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(closeAirmanProfileModal())}
      maxWidth="md"
      fullWidth
      sx={{
        '@media print': {
          '& .MuiDialog-container': { display: 'block' },
          '& .MuiPaper-root': { boxShadow: 'none', border: 'none', margin: 0, maxWidth: '100%' },
          '& .no-print': { display: 'none !important' },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            Individual Training Record
          </Typography>
          <Typography variant="caption" color="text.secondary">
            BetterIMDS • AF Form 55 Training Summary • {selectedSquadron}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box id="airman-training-record-print">
          {/* Header Metadata */}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 2,
              bgcolor: 'action.hover',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>FULL NAME</Typography>
              <Typography variant="subtitle1" fontWeight={700}>{airman.rank} {airman.lastName}, {airman.firstName}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>DOD EDIPI</Typography>
              <Typography variant="subtitle1" sx={{ fontFamily: 'monospace' }} fontWeight={700}>{airman.edipi}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>ASSIGNED UNIT</Typography>
              <Typography variant="subtitle1" fontWeight={700}>{selectedSquadron} (FW)</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>EMAIL</Typography>
              <Typography variant="body2" color="text.secondary">{airman.email}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>RECORD DATE</Typography>
              <Typography variant="body2" color="text.secondary">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <VerifiedUserIcon color={compliancePct >= 80 ? 'success' : 'error'} />
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>READINESS</Typography>
                <Typography variant="subtitle2" fontWeight={700} color={compliancePct >= 80 ? 'success.main' : 'error.main'}>
                  {validCount} / {totalCourses} Valid ({compliancePct}%)
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Courses Table */}
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
            Ancillary & Computer-Based Training (CBT) Status
          </Typography>

          <Table size="small" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <TableHead sx={{ bgcolor: 'action.selected' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Course Code</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Frequency</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Completed</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Expires</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Exemption / Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {COURSES.map((course) => {
                const detail = courses[course.courseCode];
                return (
                  <TableRow key={course.courseCode} hover>
                    <TableCell sx={{ fontWeight: 700 }}>{course.courseCode}</TableCell>
                    <TableCell>{course.courseTitle}</TableCell>
                    <TableCell align="center">{course.frequencyMonths} mo</TableCell>
                    <TableCell align="center">
                      <StatusBadge detail={detail} onClick={() => {}} />
                    </TableCell>
                    <TableCell>{detail?.completedDate || '—'}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{detail?.expirationDate || '—'}</TableCell>
                    <TableCell>
                      {detail?.reason ? <Chip label={detail.reason} size="small" variant="outlined" color="secondary" /> : 'None'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2, px: 3, justifyContent: 'space-between' }} className="no-print">
        <Button onClick={() => dispatch(closeAirmanProfileModal())} color="inherit">
          Close
        </Button>
        <Button onClick={() => window.print()} variant="contained" startIcon={<PrintIcon />}>
          Print / Save PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
}
