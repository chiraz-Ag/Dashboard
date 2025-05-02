import { CSSObject } from "@mui/system";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BarChartIcon from "@mui/icons-material/BarChart";
import PaidIcon from "@mui/icons-material/Paid";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import NextLink from "next/link";
import { useRouter } from "next/router";

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { signOut } from "next-auth/react";

const drawerWidth = 240;

// Liste des routes, traductions et icônes personnalisées
const menuRouteList = [
  "/dashboard/data",
  "/dashboard/overview",
  "/dashboard/performance",
  "/dashboard/revenus",
  "/dashboard/fidelisation",
  "/dashboard/marketing",
];

const menuListTranslations = [
  "Data",
  "Overview",
  "Performance",
  "Payments & Revenue",
  "Loyalty",
  "Marketing & Impact",
];

const menuListIcons = [
  <HomeIcon sx={{ color: "#000000" }} />,
  <DashboardIcon sx={{ color: "#000000" }} />,
  <BarChartIcon sx={{ color: "#000000" }} />,
  <PaidIcon sx={{ color: "#000000" }} />,
  <LoyaltyIcon sx={{ color: "#000000" }} />,
  <TrendingUpIcon sx={{ color: "#000000" }} />,
];

const SideMenu = () => {
  const theme = useTheme();
  const mobileCheck = useMediaQuery("(min-width: 600px)");
  const router = useRouter();

  // Cacher le SideMenu sur /dashboard/data
  if (router.pathname === "/dashboard/data") {
    return null;
  }

  const handleListItemButtonClick = (text: string) => {
    if (text === "Sign Out") {
      signOut();
    }
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          left: 0,
          top: mobileCheck ? 64 : 57,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
        },
      }}
    >
      {/* Liste des liens */}
      <List>
        {menuListTranslations.map((text, index) => (
          <React.Fragment key={text}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <NextLink href={menuRouteList[index]} passHref legacyBehavior>
                <a style={{ textDecoration: "none" }}>
                  <ListItemButton
                    onClick={() => handleListItemButtonClick(text)}
                    title={text}
                    aria-label={text}
                    sx={{
                      minHeight: 48,
                      justifyContent: "initial",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 3,
                        justifyContent: "center",
                      }}
                    >
                      {menuListIcons[index]}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{
                        color: "#000000",
                        opacity: 1,
                      }}
                    />
                  </ListItemButton>
                </a>
              </NextLink>
            </ListItem>
            <Divider sx={{ my: 0.5 }} />
          </React.Fragment>
        ))}
      </List>

      {/* Bouton de déconnexion */}
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          onClick={() => handleListItemButtonClick("Sign Out")}
          sx={{
            minHeight: 48,
            justifyContent: "initial",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
          >
            <ExitToAppIcon sx={{ color: "#000000" }} />
          </ListItemIcon>
          <ListItemText
            primary="Sign Out"
            sx={{
              color: "#000000",
              opacity: 1,
            }}
          />
        </ListItemButton>
      </ListItem>
    </Drawer>
  );
};

export default SideMenu;
