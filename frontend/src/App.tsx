import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchHelloApi } from './features/api/apiSlice';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Paper,
  Divider,
} from '@mui/material';
import {
  MilitaryTech as MilitaryIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#38bdf8' },
    secondary: { main: '#a855f7' },
    background: {
      default: '#0b0f19',
      paper: '#131b2e',
    },
  },
});

export default function App() {
  const dispatch = useAppDispatch();
  const { data: apiData, loading, error } = useAppSelector((state) => state.api);

  const handleRefetch = () => {
    dispatch(fetchHelloApi());
  };

  useEffect(() => {
    dispatch(fetchHelloApi());
  }, [dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {/* Header Bar */}
      <AppBar position="static" sx={{ background: '#131b2e', borderBottom: '1px solid #2a364f' }}>
        <Toolbar>
          <MilitaryIcon sx={{ mr: 1.5, color: '#38bdf8', fontSize: 28 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, fontFamily: 'monospace' }}>
            BetterIMDS{' '}
            <Typography component="span" sx={{ color: '#94a3b8', fontSize: '0.85rem', ml: 1 }}>
              Redux Toolkit + Spring Boot
            </Typography>
          </Typography>
          <Chip label="USAF Training & Readiness System" color="primary" variant="outlined" size="small" />
        </Toolbar>
      </AppBar>

      {/* Main Container */}
      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Redux Toolkit & Spring Boot API
          </Typography>
          <Typography variant="body1" color="text.secondary">
            State Managed via Redux Toolkit (`useAppSelector`, `useAppDispatch`, `createAsyncThunk`)
          </Typography>
        </Box>

        {/* API Response Display Card */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, border: '1px solid #2a364f' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Backend Connection Status
            </Typography>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={handleRefetch}
              disabled={loading}
              sx={{ borderRadius: 2 }}
            >
              {loading ? 'Fetching...' : 'Re-Fetch API'}
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress color="primary" />
            </Box>
          )}

          {error && (
            <Alert severity="error" icon={<ErrorIcon />} sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {apiData && !loading && (
            <Card variant="outlined" sx={{ borderColor: '#2a364f', background: '#0b0f19', borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CheckCircleIcon sx={{ color: '#22c55e' }} />
                  <Typography variant="subtitle1" fontWeight={700} color="#22c55e">
                    Status: {apiData.status}
                  </Typography>
                </Box>

                <Typography variant="h6" fontWeight={600} color="#38bdf8" gutterBottom>
                  "{apiData.message}"
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      System Module:
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {apiData.system}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Server Timestamp:
                    </Typography>
                    <Typography variant="body2" fontFamily="monospace" color="#94a3b8">
                      {apiData.timestamp}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
