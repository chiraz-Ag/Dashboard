import { SessionProvider } from "next-auth/react";
import React from "react";
import { CssBaseline } from "@mui/material";
import Header from "@/components/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeSelector from "@/components/ThemeSelector";

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
  session: any;
}

const App = ({ Component, pageProps, session }: AppProps) => {
  return (
    <ThemeProvider>
      <SessionProvider session={session}>
        <CssBaseline />
        <Header />
        
        {/* Contenu principal */}
        <div style={{ padding: 0 }}>
          <Component {...pageProps} />
        </div>
        
        {/* Theme selector floating button */}
        <ThemeSelector />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default App;
