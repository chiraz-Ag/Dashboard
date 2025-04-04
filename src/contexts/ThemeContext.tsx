import React, { createContext, useState, useContext, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

// Define theme options
const themeOptions = {
  blue: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
  },
  dark: {
    primary: {
      main: '#546e7a',
      light: '#78909c',
      dark: '#37474f',
    },
    secondary: {
      main: '#ff5722',
      light: '#ff7043',
      dark: '#e64a19',
    },
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };
  
  // Create MUI theme
  const theme = createTheme({
    palette: {
      primary: themeOptions[isDark ? 'dark' : 'blue'].primary,
      secondary: themeOptions[isDark ? 'dark' : 'blue'].secondary,
      mode: isDark ? 'dark' : 'light',
      background: {
        default: isDark ? '#121212' : '#f5f5f5',
        paper: isDark ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: isDark ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)',
        secondary: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
      }
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark 
              ? '#272727'
              : themeOptions.blue.primary.main,
          }
        }
      }
    },
  });

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 