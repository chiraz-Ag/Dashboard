import { ThemeOptions } from "@mui/material";

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',  // Indique que c'est le mode sombre
    primary: {
      main: '#9b59b6', // Violet
    },
    secondary: {
      main: '#2ecc71', // Vert
    },
    background: {
      default: '#2c3e50', // Fond sombre
      paper: '#34495e', // Papier plus clair que le fond
    },
    text: {
      primary: '#ecf0f1', // Texte clair
      secondary: '#bdc3c7', // Texte secondaire
    },
  },
};

export default darkTheme;
