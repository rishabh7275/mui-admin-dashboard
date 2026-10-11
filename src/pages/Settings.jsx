import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
  Tab,
  Tabs,
  Alert,
  IconButton,
  InputAdornment,
  useTheme,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import {
  SaveRounded,
  DarkModeRounded,
  LightModeRounded,
  SecurityRounded,
  NotificationsNoneRounded,
  PaletteRounded,
  TuneRounded,
  Visibility,
  VisibilityOff,
  CheckCircleRounded,
  LockResetRounded,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const DEFAULT_SETTINGS = {
  timezone: "Asia/Kolkata (IST +5:30)",
  dateFormat: "DD/MM/YYYY",
  defaultView: "/",
  orderAlerts: true,
  paymentAlerts: true,
  weeklyDigest: false,
  securityAlerts: true,
  workspaceName: "Rishabh Enterprise Console",
  language: "en",
  twoFactorEnabled: false,
  retentionPeriod: "90",
};

export default function Settings({ onNotice, mode, setMode }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { changePassword } = useAuth();

  const [activeTab, setActiveTab] = useState(0);

  // Settings state persisted in localStorage
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("mui_admin_settings");
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch (e) {
      console.warn("Failed to parse settings", e);
    }
    return DEFAULT_SETTINGS;
  });

  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState({ type: "", message: "" });
  const [passwordLoading, setPasswordLoading] = useState(false);

  // General feedback
  const [statusMessage, setStatusMessage] = useState("");

  const handleSettingChange = (key, value) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem("mui_admin_settings", JSON.stringify(updated));
      } catch (e) {
        console.error("Storage error:", e);
      }
      return updated;
    });
  };

  const handleSaveAll = () => {
    try {
      localStorage.setItem("mui_admin_settings", JSON.stringify(settings));
      setStatusMessage("Settings and preferences successfully saved.");
      onNotice?.("Workspace settings saved successfully");
    } catch (e) {
      setStatusMessage("Failed to save settings: " + e.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordFeedback({ type: "", message: "" });

    if (passwordForm.newPassword.length < 6) {
      setPasswordFeedback({ type: "error", message: "New password must be at least 6 characters long." });
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordFeedback({ type: "error", message: "New password and confirmation do not match." });
      return;
    }

    setPasswordLoading(true);
    try {
      await changePassword(passwordForm.newPassword);
      setPasswordFeedback({ type: "success", message: "Password updated successfully!" });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      onNotice?.("Security password updated successfully");
    } catch (err) {
      setPasswordFeedback({ type: "error", message: err.message || "Failed to update password." });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={850} letterSpacing="-0.02em">
          Settings & Preferences
        </Typography>
        <Typography color="text.secondary">
          Configure interface appearance, system alerts, account security, and workspace defaults.
        </Typography>
      </Box>

      {statusMessage && (
        <Alert severity="success" onClose={() => setStatusMessage("")}>
          {statusMessage}
        </Alert>
      )}

      {/* Tabs Navigation */}
      <Card sx={{ p: 0.5, borderRadius: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_e, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              minHeight: 48,
              fontWeight: 700,
              fontSize: "0.9rem",
              borderRadius: 2.5,
              textTransform: "none",
              mr: 1,
            },
          }}
        >
          <Tab icon={<TuneRounded fontSize="small" />} iconPosition="start" label="Preferences" />
          <Tab icon={<PaletteRounded fontSize="small" />} iconPosition="start" label="Appearance" />
          <Tab icon={<NotificationsNoneRounded fontSize="small" />} iconPosition="start" label="Notifications" />
          <Tab icon={<SecurityRounded fontSize="small" />} iconPosition="start" label="Security" />
          <Tab icon={<CheckCircleRounded fontSize="small" />} iconPosition="start" label="General" />
        </Tabs>
      </Card>

      {/* Tab 0: Profile & Workspace Preferences */}
      {activeTab === 0 && (
        <Card>
          <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            <Typography variant="h6" fontWeight={750} gutterBottom>
              Workspace Preferences
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Adjust localization, date formats, and initial landing page preferences.
            </Typography>

            <Grid container spacing={3} sx={{ maxWidth: 800 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  label="System Timezone"
                  value={settings.timezone}
                  onChange={(e) => handleSettingChange("timezone", e.target.value)}
                >
                  <MenuItem value="Asia/Kolkata (IST +5:30)">Asia/Kolkata (IST +5:30)</MenuItem>
                  <MenuItem value="UTC (Coordinated Universal Time)">UTC (Coordinated Universal Time)</MenuItem>
                  <MenuItem value="America/New_York (EST)">America/New_York (EST)</MenuItem>
                  <MenuItem value="America/Los_Angeles (PST)">America/Los_Angeles (PST)</MenuItem>
                  <MenuItem value="Europe/London (GMT)">Europe/London (GMT)</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  label="Date Format"
                  value={settings.dateFormat}
                  onChange={(e) => handleSettingChange("dateFormat", e.target.value)}
                >
                  <MenuItem value="DD/MM/YYYY">DD/MM/YYYY (e.g. 11/10/2026)</MenuItem>
                  <MenuItem value="MM/DD/YYYY">MM/DD/YYYY (e.g. 10/11/2026)</MenuItem>
                  <MenuItem value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-10-11)</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  label="Default Landing Page"
                  value={settings.defaultView}
                  onChange={(e) => handleSettingChange("defaultView", e.target.value)}
                >
                  <MenuItem value="/">Business Overview (Dashboard)</MenuItem>
                  <MenuItem value="/analytics">Performance Analytics</MenuItem>
                  <MenuItem value="/orders">Order Management</MenuItem>
                  <MenuItem value="/revenue-details">Revenue Details</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3.5 }} />
            <Button
              variant="contained"
              startIcon={<SaveRounded />}
              onClick={handleSaveAll}
              sx={{ borderRadius: 2.5, px: 3.5 }}
            >
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tab 1: Appearance */}
      {activeTab === 1 && (
        <Card>
          <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            <Typography variant="h6" fontWeight={750} gutterBottom>
              Theme & Appearance
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Select your color theme mode. The change applies across all pages immediately and persists.
            </Typography>

            <Grid container spacing={2.5} sx={{ maxWidth: 700 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Card
                  onClick={() => {
                    setMode?.("dark");
                    try {
                      localStorage.setItem("mui_theme_mode", "dark");
                    } catch (e) {}
                    onNotice?.("Switched to Dark mode");
                  }}
                  sx={{
                    p: 2.5,
                    cursor: "pointer",
                    border: mode === "dark" ? "2px solid #7c4dff !important" : "1px solid rgba(148,163,184,0.2)",
                    bgcolor: mode === "dark" ? "rgba(124,77,255,0.08)" : "background.paper",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderRadius: 3,
                    transition: "all 0.2s ease",
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2.5,
                      bgcolor: "rgba(124,77,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#7c4dff",
                    }}
                  >
                    <DarkModeRounded fontSize="medium" />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={750}>
                      Dark Mode
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Deep slate background with vibrant accents
                    </Typography>
                  </Box>
                  {mode === "dark" && <Chip label="Active" color="primary" size="small" />}
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Card
                  onClick={() => {
                    setMode?.("light");
                    try {
                      localStorage.setItem("mui_theme_mode", "light");
                    } catch (e) {}
                    onNotice?.("Switched to Light mode");
                  }}
                  sx={{
                    p: 2.5,
                    cursor: "pointer",
                    border: mode === "light" ? "2px solid #7c4dff !important" : "1px solid rgba(148,163,184,0.2)",
                    bgcolor: mode === "light" ? "rgba(124,77,255,0.08)" : "background.paper",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderRadius: 3,
                    transition: "all 0.2s ease",
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2.5,
                      bgcolor: "rgba(0,191,166,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#00bfa6",
                    }}
                  >
                    <LightModeRounded fontSize="medium" />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={750}>
                      Light Mode
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Crisp, clean layout for high-visibility environments
                    </Typography>
                  </Box>
                  {mode === "light" && <Chip label="Active" color="primary" size="small" />}
                </Card>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3.5 }} />

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 700 }}>
              <Box>
                <Typography fontWeight={700}>System Accent Color</Typography>
                <Typography variant="caption" color="text.secondary">
                  Default primary highlight: Royal Violet (#7c4dff) & Teal Accent (#00bfa6)
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Box sx={{ width: 28, height: 28, borderRadius: "50%", bgcolor: "#7c4dff", border: "2px solid #fff" }} />
                <Box sx={{ width: 28, height: 28, borderRadius: "50%", bgcolor: "#00bfa6" }} />
              </Stack>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Tab 2: Notifications */}
      {activeTab === 2 && (
        <Card>
          <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            <Typography variant="h6" fontWeight={750} gutterBottom>
              Notification Alerts
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Control which system events send alerts to the Topbar bell and trigger email notifications.
            </Typography>

            <Stack spacing={2.5} sx={{ maxWidth: 700 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography fontWeight={700}>Order & Checkout Alerts</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Receive immediate notifications when new customer orders are placed.
                  </Typography>
                </Box>
                <Switch
                  checked={settings.orderAlerts}
                  onChange={(e) => handleSettingChange("orderAlerts", e.target.checked)}
                />
              </Box>
              <Divider />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography fontWeight={700}>Payment & Transaction Activity</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Alerts for completed payments, refunds, and batch settlement logs.
                  </Typography>
                </Box>
                <Switch
                  checked={settings.paymentAlerts}
                  onChange={(e) => handleSettingChange("paymentAlerts", e.target.checked)}
                />
              </Box>
              <Divider />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography fontWeight={700}>Weekly Digest Summary</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Receive weekly analytical summaries and business growth indexes.
                  </Typography>
                </Box>
                <Switch
                  checked={settings.weeklyDigest}
                  onChange={(e) => handleSettingChange("weeklyDigest", e.target.checked)}
                />
              </Box>
              <Divider />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography fontWeight={700}>Security & Access Alerts</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Critical alerts regarding unauthorized logins or credential changes.
                  </Typography>
                </Box>
                <Switch
                  checked={settings.securityAlerts}
                  onChange={(e) => handleSettingChange("securityAlerts", e.target.checked)}
                />
              </Box>
            </Stack>

            <Divider sx={{ my: 3.5 }} />
            <Button
              variant="contained"
              startIcon={<SaveRounded />}
              onClick={handleSaveAll}
              sx={{ borderRadius: 2.5, px: 3.5 }}
            >
              Save Notification Preferences
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tab 3: Security & Password */}
      {activeTab === 3 && (
        <Card>
          <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            <Typography variant="h6" fontWeight={750} gutterBottom>
              Security Credentials & Authentication
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Update your account password and configure login protection.
            </Typography>

            {passwordFeedback.message && (
              <Alert
                severity={passwordFeedback.type}
                sx={{ mb: 3 }}
                onClose={() => setPasswordFeedback({ type: "", message: "" })}
              >
                {passwordFeedback.message}
              </Alert>
            )}

            <Box component="form" onSubmit={handlePasswordSubmit} sx={{ maxWidth: 550 }}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type={showCurrent ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                  required
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowCurrent(!showCurrent)} edge="end">
                            {showCurrent ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="New Password"
                  type={showNew ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                  helperText="Minimum 6 characters with letters and numbers"
                  required
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowNew(!showNew)} edge="end">
                            {showNew ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type={showConfirm ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                  required
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                            {showConfirm ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={passwordLoading}
                  startIcon={<LockResetRounded />}
                  sx={{
                    borderRadius: 2.5,
                    py: 1.2,
                    background: "linear-gradient(135deg, #7c4dff 0%, #651fff 100%)",
                  }}
                >
                  {passwordLoading ? "Updating Password..." : "Update Password"}
                </Button>
              </Stack>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 650 }}>
              <Box>
                <Typography fontWeight={700}>Two-Factor Authentication (2FA)</Typography>
                <Typography variant="caption" color="text.secondary">
                  Require an authenticator app confirmation code on new device sign-ins.
                </Typography>
              </Box>
              <Switch
                checked={settings.twoFactorEnabled}
                onChange={(e) => {
                  handleSettingChange("twoFactorEnabled", e.target.checked);
                  onNotice?.(e.target.checked ? "2FA protection enabled" : "2FA protection disabled");
                }}
              />
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Tab 4: General Settings */}
      {activeTab === 4 && (
        <Card>
          <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            <Typography variant="h6" fontWeight={750} gutterBottom>
              General System Settings
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Organization identity, language preferences, and data retention windows.
            </Typography>

            <Grid container spacing={3} sx={{ maxWidth: 700 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Workspace Title"
                  value={settings.workspaceName}
                  onChange={(e) => handleSettingChange("workspaceName", e.target.value)}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  label="Platform Language"
                  value={settings.language}
                  onChange={(e) => handleSettingChange("language", e.target.value)}
                >
                  <MenuItem value="en">English (United States)</MenuItem>
                  <MenuItem value="es">Español (Spanish)</MenuItem>
                  <MenuItem value="fr">Français (French)</MenuItem>
                  <MenuItem value="de">Deutsch (German)</MenuItem>
                  <MenuItem value="hi">हिन्दी (Hindi)</MenuItem>
                </TextField>
              </Grid>

              <Grid size={12}>
                <TextField
                  select
                  fullWidth
                  label="Analytics Data Retention"
                  value={settings.retentionPeriod}
                  onChange={(e) => handleSettingChange("retentionPeriod", e.target.value)}
                >
                  <MenuItem value="30">30 Days</MenuItem>
                  <MenuItem value="90">90 Days (Recommended)</MenuItem>
                  <MenuItem value="365">1 Year</MenuItem>
                  <MenuItem value="all">Indefinite (Keep all historical data)</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3.5 }} />
            <Button
              variant="contained"
              startIcon={<SaveRounded />}
              onClick={handleSaveAll}
              sx={{ borderRadius: 2.5, px: 3.5 }}
            >
              Save General Settings
            </Button>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}