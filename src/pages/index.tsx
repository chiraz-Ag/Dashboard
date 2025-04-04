import Head from "next/head";
import Dashboard from "@/pages/dashboard";
import SideMenu from "@/components/SideMenu";
import Login from "@/components/auth/login";
import { useSession } from "next-auth/react";
import scss from "./Home.module.scss";
import React from "react";
import { Box, Paper, Typography, Container, useTheme as useMuiTheme } from "@mui/material";
import { useTheme } from "@/contexts/ThemeContext";

const Home: React.FC = () => {
  const { data: session } = useSession();
  const { isDark } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <>
      <Head>
        <title>DataSoft - Dashboard</title>
        <meta name="description" content="Data Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={scss.main}>
        {session ? (
          <>
            <SideMenu />
            <Dashboard />
          </>
        ) : (
          <Container maxWidth="sm">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
                py: 4
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  width: '100%',
                  textAlign: 'center',
                  background: isDark
                    ? 'rgba(30, 30, 30, 0.9)' 
                    : 'rgba(255, 255, 255, 0.9)',
                  boxShadow: isDark
                    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                    : '0 8px 32px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                }}
              >
                <Typography 
                  variant="h4" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'primary.main',
                    mb: 3
                  }}
                >
                  Welcome to DataSoft
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 4,
                    color: 'text.secondary',
                    fontSize: '1.1rem'
                  }}
                >
                  Please sign in to access your dashboard
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Login />
                </Box>
              </Paper>
            </Box>
          </Container>
        )}
      </main>
    </>
  );
};

export default Home;
