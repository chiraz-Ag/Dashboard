import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { signIn, signOut, useSession } from "next-auth/react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "next/router";
import ThemeSelector from "@/components/ThemeSelector";

const Header = () => {
  const { data: session } = useSession();
  const { isDark } = useTheme();
  const router = useRouter();
  const userProfileImg = session?.user?.image as string;
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateHome = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
  };

  const tabletCheck = useMediaQuery("(min-width: 768px)");

  return (
    <AppBar 
      position="static" 
      sx={{ 
        marginBottom: "40px",
        transition: "background-color 0.3s ease",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon 
            sx={{ 
              display: { xs: "none", md: "flex" }, 
              mr: 1,
              color: isDark ? '#fff' : 'inherit',
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            onClick={navigateHome}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: isDark ? '#fff' : 'inherit',
              textDecoration: "none",
            }}
          >
            DataSoft
          </Typography>
          <AdbIcon 
            sx={{ 
              display: { xs: "flex", md: "none" }, 
              mr: 1,
              color: isDark ? '#fff' : 'inherit',
            }} 
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            onClick={navigateHome}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: isDark ? '#fff' : 'inherit',
              textDecoration: "none",
            }}
          >
            DataSoft
          </Typography>
          {tabletCheck && session && (
            <Box sx={{ paddingRight: 5, marginLeft: "auto" }}>
              <Typography sx={{ color: isDark ? '#fff' : 'inherit' }}>
                Signed in as {session?.user?.email}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <Tooltip title="Open profile settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={session?.user?.name as string}
                  src={userProfileImg}
                />
              </IconButton>
            </Tooltip>
            <ThemeSelector />
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => (session ? signOut() : signIn())}>
                <Typography textAlign="center">
                  {session ? "Logout" : "Login"}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
