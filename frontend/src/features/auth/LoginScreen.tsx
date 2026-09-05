import { Box, Card, CardContent, IconButton, Container } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toggleDarkMode, selectDarkMode } from '@/features/dashboard';
import ClassificationBanner from './components/ClassificationBanner';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import QuickDemoSelector from './components/QuickDemoSelector';

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        bgcolor: 'background.default',
        px: 2,
        py: 4,
      }}
    >
      {/* Theme Switcher in Corner */}
      <Box sx={{ position: 'absolute', top: 20, right: 24 }}>
        <IconButton
          onClick={() => dispatch(toggleDarkMode())}
          color="inherit"
          sx={{
            bgcolor: 'action.hover',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {darkMode ? <LightModeIcon sx={{ color: '#f59e0b' }} /> : <DarkModeIcon />}
        </IconButton>
      </Box>

      {/* Security Classification Banner */}
      <ClassificationBanner />

      <Container maxWidth="xs">
        <Card
          elevation={10}
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'visible',
            backdropFilter: 'blur(16px)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Header: USAF Logo & Title */}
            <LoginHeader />

            {/* Login Form (Self-contained with Redux) */}
            <LoginForm />

            {/* Preset Demo Accounts (Self-contained with Redux) */}
            <QuickDemoSelector />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
