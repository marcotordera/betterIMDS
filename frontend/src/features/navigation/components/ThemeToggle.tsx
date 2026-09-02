import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleDarkMode } from '../../dashboard/state/utmSlice';

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.utm.darkMode);

  return (
    <Tooltip title={`Switch to ${darkMode ? 'Light' : 'Dark'} mode`}>
      <IconButton onClick={() => dispatch(toggleDarkMode())} color="inherit" size="small">
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
}
