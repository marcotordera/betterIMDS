import { Box, Card, CardContent, Container } from '@mui/material';
import ClassificationBanner from './components/ClassificationBanner';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import QuickDemoSelector from './components/QuickDemoSelector';

export default function LoginScreen() {

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
