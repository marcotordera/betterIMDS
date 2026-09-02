import { useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import { useAppSelector } from './app/hooks';
import Navbar from './features/navigation/Navbar';
import UtmDashboard from './features/dashboard/UtmDashboard';

export default function App() {
  // Read theme mode directly from Redux
  const darkMode = useAppSelector((state) => state.utm.darkMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: { main: '#0284c7' }, // USAF Blue
          secondary: { main: '#7c3aed' },
          background: {
            default: darkMode ? '#0b0f19' : '#f8fafc',
            paper: darkMode ? '#131b2e' : '#ffffff',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Top Navbar Feature (Zero Props) */}
      <Navbar />

      {/* Main UTM Dashboard Feature (Zero Props) */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
        <UtmDashboard />
      </Container>
    </ThemeProvider>
  );
}
