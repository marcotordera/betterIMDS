import { Divider, Typography, Stack, Chip } from '@mui/material';
import { useAppDispatch } from '@/app/hooks';
import { DEMO_ADMINS, selectDemoAdmin } from '../authSlice';

export default function QuickDemoSelector() {
  const dispatch = useAppDispatch();

  return (
    <>
      <Divider sx={{ my: 3 }}>
        <Typography variant="caption" color="text.secondary" sx={{ px: 1, fontWeight: 600 }}>
          QUICK DEMO SIGN-IN
        </Typography>
      </Divider>

      <Stack spacing={1}>
        {DEMO_ADMINS.map((admin) => (
          <Chip
            key={admin.adminId}
            label={`${admin.fullName} (${admin.defaultSquadron})`}
            variant="outlined"
            clickable
            onClick={() => dispatch(selectDemoAdmin(admin))}
            sx={{
              justifyContent: 'flex-start',
              py: 2,
              px: 1,
              fontWeight: 600,
              fontSize: '0.82rem',
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'action.hover',
                borderColor: 'primary.main',
              },
            }}
          />
        ))}
      </Stack>
    </>
  );
}
