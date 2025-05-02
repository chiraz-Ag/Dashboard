import React from "react";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Switch,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { useTheme } from "@/contexts/ThemeContext";

const SettingsPage = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      style={{
        paddingTop: "5rem", // To avoid hiding under the AppBar
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Profile Section */}
      <Card sx={{ mb: 2, width: "100%", maxWidth: 400 }}>
        <CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Avatar
              alt="User"
              src="/path-to-profile-image.jpg"
              sx={{ mr: 2 }}
            />
            <Typography variant="h6">User</Typography>
          </div>
          <Button variant="contained" color="primary" fullWidth>
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Appearance Section */}
      <Card sx={{ mb: 2, width: "100%", maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Appearance
          </Typography>
          <FormControlLabel
            control={<Switch checked={isDark} onChange={toggleTheme} />}
            label={isDark ? "Dark Mode" : "Light Mode"}
          />
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card sx={{ mb: 2, width: "100%", maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <FormControlLabel control={<Switch />} label="Enable Notifications" />
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card sx={{ mb: 2, width: "100%", maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Security
          </Typography>
          <Typography variant="body2" color="textSecondary">
            You are logged in with Google
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              mt: 2,
              color: "#E91E63", // Pink color
              borderColor: "#E91E63",
              "&:hover": {
                backgroundColor: "#fce4ec",
                borderColor: "#E91E63",
              },
            }}
          >
            Logout
          </Button>
        </CardContent>
      </Card>

      {/* Currency Section */}
      <Card sx={{ mb: 2, width: "100%", maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Currency
          </Typography>
          <FormControl fullWidth>
            <Typography variant="body1">Selected Currency: USD</Typography>
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
