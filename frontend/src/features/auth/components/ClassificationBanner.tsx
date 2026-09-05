import { Box, Typography } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';

export default function ClassificationBanner() {
  return (
    <Box
      sx={{
        mb: 3,
        px: 2.5,
        py: 0.6,
        borderRadius: 2,
        bgcolor: 'action.selected',
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <SecurityIcon fontSize="small" color="primary" />
      <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.08em' }}>
        UNCLASSIFIED // FOR OFFICIAL USE ONLY (FOUO)
      </Typography>
    </Box>
  );
}
