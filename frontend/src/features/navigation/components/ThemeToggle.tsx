import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toggleDarkMode, selectDarkMode } from '@/features/dashboard';

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);

  return (
    <Tooltip title={`Switch to ${darkMode ? 'Light' : 'Dark'} mode`}>
      <IconButton onClick={() => dispatch(toggleDarkMode())} color="inherit" size="small">
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
}
