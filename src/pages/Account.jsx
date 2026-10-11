import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
  Alert,
} from "@mui/material";
import {
  SaveRounded,
  CloseRounded,
  BadgeRounded,
  EmailRounded,
  PhoneRounded,
  LocationOnRounded,
  BusinessRounded,
  ShieldRounded,
  CheckCircleRounded,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

export default function Account({ onNotice }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { profile, updateProfile, isSupabaseConfigured } = useAuth();

  const [form, setForm] = useState({
    fullName: profile?.fullName || "Rishabh Tiwari",
    email: profile?.email || "rishabh@example.com",
    phone: profile?.phone || "+91 98765 43210",
    role: profile?.role || "Administrator",
    department: profile?.department || "Product & Engineering",
    bio: profile?.bio || "Lead Systems Administrator managing core infrastructure and business analytics.",
    location: profile?.location || "New Delhi, India",
  });

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Sync form if profile changes
  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        role: profile.role || "Administrator",
        department: profile.department || "",
        bio: profile.bio || "",
        location: profile.location || "",
      });
    }
  }, [profile]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrorMsg("");
  };

  const handleReset = () => {
    setForm({
      fullName: profile?.fullName || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      role: profile?.role || "Administrator",
      department: profile?.department || "",
      bio: profile?.bio || "",
      location: profile?.location || "",
    });
    setErrorMsg("");
    onNotice?.("Form reset to saved profile");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim()) {
      setErrorMsg("Full name is required");
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      setErrorMsg("Valid email address is required");
      return;
    }

    setSaving(true);
    try {
      await updateProfile(form);
      onNotice?.("Account profile updated successfully");
    } catch (err) {
      setErrorMsg(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const initials = form.fullName
    ? form.fullName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "RT";

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={850} letterSpacing="-0.02em">
          Account Profile
        </Typography>
        <Typography color="text.secondary">
          Manage your personal details, workspace role, and security credentials.
        </Typography>
      </Box>

      {errorMsg && (
        <Alert severity="error" onClose={() => setErrorMsg("")}>
          {errorMsg}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Left Column: Profile Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3, textAlign: "center" }}>
              <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    fontSize: "2.2rem",
                    fontWeight: 800,
                    margin: "0 auto",
                    background: "linear-gradient(135deg, #7c4dff 0%, #00bfa6 100%)",
                    boxShadow: "0 8px 24px rgba(124, 77, 255, 0.4)",
                  }}
                >
                  {initials}
                </Avatar>
              </Box>

              <Typography variant="h5" fontWeight={800} gutterBottom>
                {form.fullName || "User"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {form.email}
              </Typography>

              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                <Chip
                  label={form.role}
                  color="primary"
                  size="small"
                  sx={{ fontWeight: 700 }}
                />
                <Chip
                  icon={<CheckCircleRounded sx={{ fontSize: "1rem !important" }} />}
                  label="Active"
                  color="success"
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: 700 }}
                />
              </Stack>

              <Divider sx={{ my: 2.5 }} />

              <Stack spacing={2} sx={{ textAlign: "left" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <BusinessRounded fontSize="small" sx={{ color: "text.secondary" }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Department
                    </Typography>
                    <Typography variant="body2" fontWeight={650}>
                      {form.department || "Engineering"}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <LocationOnRounded fontSize="small" sx={{ color: "text.secondary" }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Location
                    </Typography>
                    <Typography variant="body2" fontWeight={650}>
                      {form.location || "Not specified"}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <ShieldRounded fontSize="small" sx={{ color: "text.secondary" }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Auth Provider
                    </Typography>
                    <Typography variant="body2" fontWeight={650}>
                      {isSupabaseConfigured ? "Supabase Auth (Live)" : "Local Workspace"}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column: Editable Details Form */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
              <Typography variant="h6" fontWeight={750} sx={{ mb: 1 }}>
                Edit Account Information
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Updates made here are synchronized with your session and persisted.
              </Typography>

              <Box component="form" onSubmit={handleSave}>
                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={form.fullName}
                      onChange={handleChange("fullName")}
                      required
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      value={form.email}
                      onChange={handleChange("email")}
                      required
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={form.phone}
                      onChange={handleChange("phone")}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Role / Title"
                      value={form.role}
                      onChange={handleChange("role")}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Department"
                      value={form.department}
                      onChange={handleChange("department")}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Location / Office"
                      value={form.location}
                      onChange={handleChange("location")}
                    />
                  </Grid>

                  <Grid size={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Professional Bio"
                      value={form.bio}
                      onChange={handleChange("bio")}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3.5 }} />

                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    startIcon={<CloseRounded />}
                    onClick={handleReset}
                    disabled={saving}
                    sx={{
                      borderRadius: 2.5,
                      px: 2.5,
                      borderColor: isDark ? "rgba(148, 163, 184, 0.25)" : "rgba(15, 23, 42, 0.15)",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveRounded />}
                    disabled={saving}
                    sx={{
                      borderRadius: 2.5,
                      px: 3.5,
                      background: "linear-gradient(135deg, #7c4dff 0%, #651fff 100%)",
                    }}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
