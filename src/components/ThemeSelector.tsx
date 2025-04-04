import React from 'react';
import { IconButton, Tooltip, Paper } from '@mui/material';
import { useTheme } from '@/contexts/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeSelector: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        position: 'fixed',
        bottom: 24,
        right: 24,
        p: 1,
        borderRadius: 3,
        zIndex: 1000,
      }}
    >
      <Tooltip title={isDark ? 'Switch to Blue Theme' : 'Switch to Dark Theme'}>
        <IconButton 
          onClick={toggleTheme} 
          size="medium"
          sx={{
            color: isDark ? '#f5f5f5' : '#1976d2',
          }}
        >
          {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default ThemeSelector; 