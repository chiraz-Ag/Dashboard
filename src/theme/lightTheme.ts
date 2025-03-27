import { ThemeOptions } from "@mui/material";

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',  // Indique que c'est le mode clair
    primary: {
      main: '#3498db', // Bleu
    },
    secondary: {
      main: '#e74c3c', // Rouge
    },
    background: {
      default: '#f4f6f8', // Fond clair
      paper: '#ffffff', // Papier blanc
    },
    text: {
      primary: '#2c3e50', // Texte sombre
      secondary: '#7f8c8d', // Texte secondaire
    },
  },
};

export default lightTheme;
