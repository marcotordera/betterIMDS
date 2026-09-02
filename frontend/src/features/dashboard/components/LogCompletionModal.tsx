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
} from '@mui/material';
import { Airman, Course } from '../../../types/utm';

interface Props {
  open: boolean;
  onClose: () => void;
  airmen: Airman[];
  courses: Course[];
  initialAirmanId?: number;
  initialCourseCode?: string;
  onSave: (airmanId: number, courseCode: string, completedDate: string) => void;
}

export default function LogCompletionModal({
  open,
  onClose,
  airmen,
  courses,
  initialAirmanId,
  initialCourseCode,
  onSave,
}: Props) {
  const [selectedAirmanId, setSelectedAirmanId] = useState<number>(initialAirmanId || (airmen[0]?.uid ?? 1));
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>(initialCourseCode || (courses[0]?.courseCode ?? ''));
  const [completedDate, setCompletedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (initialAirmanId) setSelectedAirmanId(initialAirmanId);
    if (initialCourseCode) setSelectedCourseCode(initialCourseCode);
  }, [initialAirmanId, initialCourseCode]);

  const handleSubmit = () => {
    onSave(selectedAirmanId, selectedCourseCode, completedDate);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Log Course Completion</DialogTitle>
      
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Record a completed training certification for an Airman.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Airman Selector */}
          <TextField
            select
            label="Select Airman"
            value={selectedAirmanId}
            onChange={(e) => setSelectedAirmanId(Number(e.target.value))}
            fullWidth
          >
            {airmen.map((a) => (
              <MenuItem key={a.uid} value={a.uid}>
                {a.rank} {a.lastName}, {a.firstName} (EDIPI: {a.edipi})
              </MenuItem>
            ))}
          </TextField>

          {/* Course Selector */}
          <TextField
            select
            label="Select Course / CBT"
            value={selectedCourseCode}
            onChange={(e) => setSelectedCourseCode(e.target.value)}
            fullWidth
          >
            {courses.map((c) => (
              <MenuItem key={c.courseCode} value={c.courseCode}>
                {c.courseCode} - {c.courseTitle}
              </MenuItem>
            ))}
          </TextField>

          {/* Completion Date */}
          <TextField
            type="date"
            label="Completion Date"
            value={completedDate}
            onChange={(e) => setCompletedDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save Completion
        </Button>
      </DialogActions>
    </Dialog>
  );
}
