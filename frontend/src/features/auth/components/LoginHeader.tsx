import { Box, Typography } from '@mui/material';

export default function LoginHeader() {
  return (
    <Box sx={{ textAlign: 'center', mb: 3 }}>
      <Box
        component="img"
        src="/usaf-logo.png"
        alt="USAF Logo"
        sx={{
          width: 72,
          height: 72,
          mb: 1.5,
          filter: 'drop-shadow(0 4px 12px rgba(2, 132, 199, 0.3))',
        }}
      />
      <Typography variant="h5" component="h1" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
        BetterIMDS
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 500 }}>
        35th Fighter Wing • UTM Portal
      </Typography>
    </Box>
  );
}
