import { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  Button,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  openBulkModal,
  clearSelection,
  removeSelectedAirmen,
  selectSelectedAirmanIds,
} from '../../dashboardSlice';
import BulkActionModal from './BulkActionModal';

export default function BulkActionBar() {
  const dispatch = useAppDispatch();
  const selectedAirmanIds = useAppSelector(selectSelectedAirmanIds);
  const selectedCount = selectedAirmanIds.length;
  const visible = selectedCount > 0;
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmRemove = () => {
    dispatch(removeSelectedAirmen());
    setConfirmOpen(false);
  };

  return (
    <>
      <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1300,
            borderRadius: 3,
            px: 3,
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            border: '1px solid',
            borderColor: 'divider',
            backdropFilter: 'blur(12px)',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(30, 41, 59, 0.92)'
                : 'rgba(255, 255, 255, 0.95)',
            maxWidth: '92vw',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {selectedCount} Airm{selectedCount === 1 ? 'an' : 'en'} Selected
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              startIcon={<CheckCircleOutlineIcon />}
              onClick={() => dispatch(openBulkModal('VALID'))}
              sx={{ fontWeight: 600, textTransform: 'none' }}
            >
              Bulk Log Complete
            </Button>

            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<ShieldOutlinedIcon />}
              onClick={() => dispatch(openBulkModal('WAIVER'))}
              sx={{ fontWeight: 600, textTransform: 'none' }}
            >
              Bulk Exempt / Waiver
            </Button>

            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<HighlightOffIcon />}
              onClick={() => dispatch(openBulkModal('OVERDUE'))}
              sx={{ fontWeight: 600, textTransform: 'none' }}
            >
              Bulk Invalidate
            </Button>

            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteOutlineIcon />}
              onClick={() => setConfirmOpen(true)}
              sx={{ fontWeight: 600, textTransform: 'none' }}
            >
              Remove
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              size="small"
              startIcon={<CloseIcon />}
              onClick={() => dispatch(clearSelection())}
              sx={{ fontWeight: 600, textTransform: 'none' }}
            >
              Deselect All
            </Button>
          </Box>
        </Paper>
      </Slide>

      {/* Confirmation Dialog for Removing Airmen */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, p: 1 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
          Remove Airmen from Roster?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
            Are you sure you want to remove <strong>{selectedCount}</strong> selected airm{selectedCount === 1 ? 'an' : 'en'} from the active squadron roster?
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ px: 3, py: 1.5, justifyContent: 'space-between' }}>
          <Button onClick={() => setConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            onClick={handleConfirmRemove}
          >
            Remove Airmen
          </Button>
        </DialogActions>
      </Dialog>

      {/* Encapsulated Child Modal */}
      <BulkActionModal />
    </>
  );
}
