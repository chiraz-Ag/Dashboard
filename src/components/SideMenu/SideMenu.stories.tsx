import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RepeatIcon from "@mui/icons-material/Repeat";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useRouter } from "next/router";

const menuItems = [
  {
    label: "Vue d’ensemble",
    icon: <DashboardIcon />,
    href: "/overview",
  },
  {
    label: "Performance",
    icon: <TrendingUpIcon />,
    href: "/performance",
  },
  {
    label: "Paiements & Revenus",
    icon: <MonetizationOnIcon />,
    href: "/revenus",
  },
  {
    label: "Fidélisation",
    icon: <RepeatIcon />,
    href: "/fidelisation",
  },
  {
    label: "Marketing & impact",
    icon: <CampaignIcon />,
    href: "/marketing",
  },
];

const SideMenu = () => {
  const theme = useTheme();
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              selected={currentPath === item.href}
              onClick={() => router.push(item.href)}
            >
              <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
