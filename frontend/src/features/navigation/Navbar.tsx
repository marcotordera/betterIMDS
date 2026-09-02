import { AppBar, Toolbar, Box } from '@mui/material';
import BrandLogo from './components/BrandLogo';
import SquadronSelector from './components/SquadronSelector';
import UserProfileBadge from './components/UserProfileBadge';
import ThemeToggle from './components/ThemeToggle';

export default function Navbar() {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Brand Logo & Title */}
        <BrandLogo />

        {/* Right: Squadron Dropdown + UTM Badge + Theme Switch */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SquadronSelector />
          <UserProfileBadge />
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
