import { SessionProvider } from "next-auth/react";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, IconButton } from "@mui/material";
import darkTheme from "@/theme/darkTheme"; // Import de darkTheme
import lightTheme from "@/theme/lightTheme"; // Import de lightTheme
import Header from "@/components/Header";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Icône pour le mode sombre
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Icône pour le mode clair

// Contexte pour basculer entre les modes clair et sombre
const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
  session: any;
}

const App = ({ Component, pageProps, session }: AppProps) => {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");

  // Fonction pour basculer entre les modes clair et sombre
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // Thème dynamique basé sur le mode actuel
  const theme = React.useMemo(() => {
    return createTheme(mode === "dark" ? darkTheme : lightTheme); // Appliquer le thème clair ou sombre
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <CssBaseline />
          <Header ColorModeContext={ColorModeContext} />

          {/* Bouton pour basculer entre les modes clair et sombre */}
          <div style={{ position: "fixed", top: 16, right: 16 }}>
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </div>

          {/* Contenu principal */}
          <div style={{ marginTop: 20, padding: 20 }}>
            <Component {...pageProps} />
          </div>
        </SessionProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
