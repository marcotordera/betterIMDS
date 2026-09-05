import { useMemo } from 'react';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { useAppSelector } from '@/app/hooks';
import { selectDarkMode } from '@/features/dashboard';
import { Navbar } from '@/features/navigation';
import { UtmDashboard } from '@/features/dashboard';
import { LoginScreen } from '@/features/auth';
import { getAppTheme } from '@/theme';

export default function App() {
  const darkMode = useAppSelector(selectDarkMode);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const theme = useMemo(() => getAppTheme(darkMode), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {!isAuthenticated ? (
        <LoginScreen />
      ) : (
        <>
          <Navbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
            <UtmDashboard />
          </Container>
        </>
      )}
    </ThemeProvider>
  );
}
