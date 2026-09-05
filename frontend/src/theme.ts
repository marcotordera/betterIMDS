import { createTheme } from '@mui/material';

export const getAppTheme = (darkMode: boolean) =>
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
  });
