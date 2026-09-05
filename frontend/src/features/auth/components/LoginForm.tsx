import React from 'react';
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  loginSuccess,
  loginFailure,
  clearAuthError,
  setFormEmail,
  setFormPassword,
  toggleShowPassword,
  setRememberMe,
  DEMO_ADMINS,
} from '../authSlice';
import { setSelectedSquadron } from '@/features/dashboard';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { form, error } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearAuthError());

    const trimmedEmail = form.email.trim().toLowerCase();
    const foundAdmin = DEMO_ADMINS.find(
      (a) => a.email.toLowerCase() === trimmedEmail && a.password === form.password
    );

    if (foundAdmin) {
      const { password: _, ...adminData } = foundAdmin;
      dispatch(loginSuccess(adminData));
      dispatch(setSelectedSquadron(foundAdmin.defaultSquadron));
    } else {
      dispatch(loginFailure('Invalid email or password. Use one of the demo credentials below.'));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {error && (
        <Alert severity="error" sx={{ borderRadius: 1.5 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Email Address (.mil)"
        placeholder="rank.name@us.af.mil"
        value={form.email}
        onChange={(e) => dispatch(setFormEmail(e.target.value))}
        fullWidth
        required
        autoComplete="email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlinedIcon fontSize="small" color="action" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Password / CAC PIN Simulation"
        type={form.showPassword ? 'text' : 'password'}
        value={form.password}
        onChange={(e) => dispatch(setFormPassword(e.target.value))}
        fullWidth
        required
        autoComplete="current-password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlinedIcon fontSize="small" color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => dispatch(toggleShowPassword())}
                edge="end"
                size="small"
                aria-label="toggle password visibility"
              >
                {form.showPassword ? (
                  <VisibilityOffOutlinedIcon fontSize="small" />
                ) : (
                  <VisibilityOutlinedIcon fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={form.rememberMe}
            onChange={(e) => dispatch(setRememberMe(e.target.checked))}
            color="primary"
            size="small"
          />
        }
        label="Remember this CAC / Device"
        sx={{ '& .MuiTypography-root': { fontSize: '0.875rem' } }}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        sx={{
          py: 1.3,
          fontWeight: 700,
          textTransform: 'none',
          fontSize: '1rem',
          boxShadow: 2,
        }}
      >
        Sign In with DoD Credentials
      </Button>
    </Box>
  );
}
