import { Box, Typography } from '@mui/material';

export default function BrandLogo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box
        component="img"
        src="/usaf-logo.png"
        alt="United States Air Force"
        sx={{
          height: 32,
          width: 'auto',
          display: 'block',
        }}
      />
      <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: -0.5 }}>
        BetterIMDS
      </Typography>
    </Box>
  );
}
