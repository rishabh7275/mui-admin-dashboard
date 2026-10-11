import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Alert,
  Fade,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  EmailOutlined,
  PersonOutline,
  LoginRounded,
  ShieldRounded,
  BoltRounded,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, signUp, isSupabaseConfigured } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const from = location.state?.from?.pathname || "/";

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (isSignUp && !fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password, fullName);
        if (isSupabaseConfigured) {
          setSuccessMessage("Account created successfully! Check your email for confirmation if enabled.");
        } else {
          setSuccessMessage("Account created! Redirecting to workspace...");
          setTimeout(() => navigate(from, { replace: true }), 600);
        }
      } else {
        await signIn(email, password);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setErrorMessage(err.message || "Authentication failed. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail("admin@example.com");
    setPassword("admin123");
    setFullName("Rishabh Tiwari");
    setErrorMessage("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, sm: 3 },
        bgcolor: "#080d1a",
        backgroundImage:
          "radial-gradient(ellipse 70% 45% at 20% -5%, rgba(124, 77, 255, 0.22) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 85% 15%, rgba(0, 191, 166, 0.15) 0%, transparent 50%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(99, 102, 241, 0.12) 0%, transparent 60%)",
        backgroundAttachment: "fixed",
      }}
    >
      <Fade in timeout={500}>
        <Card
          sx={{
            maxWidth: 460,
            width: "100%",
            borderRadius: 4,
            bgcolor: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(124, 77, 255, 0.25)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6), 0 0 30px -5px rgba(124, 77, 255, 0.2)",
            overflow: "hidden",
          }}
        >
          {/* Top Brand Banner */}
          <Box
            sx={{
              p: 3.5,
              pb: 2.5,
              textAlign: "center",
              background: "linear-gradient(180deg, rgba(124, 77, 255, 0.12) 0%, transparent 100%)",
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 3,
                margin: "0 auto 14px",
                background: "linear-gradient(135deg, #7c4dff 0%, #00bfa6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(124, 77, 255, 0.4)",
              }}
            >
              <ShieldRounded sx={{ color: "#ffffff", fontSize: 30 }} />
            </Box>
            <Typography variant="h5" fontWeight={900} letterSpacing="-0.02em" sx={{ color: "#f8fafc" }}>
              Rishabh<span style={{ color: "#7c4dff" }}>.</span> Admin
            </Typography>
            <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, letterSpacing: "0.06em" }}>
              ENTERPRISE ANALYTICS CONSOLE
            </Typography>
          </Box>

          <CardContent sx={{ px: { xs: 3, sm: 4 }, pt: 1, pb: 4 }}>
            {/* Mode Switch Tabs */}
            <Stack direction="row" spacing={1} sx={{ mb: 3, bgcolor: "rgba(255,255,255,0.04)", p: 0.5, borderRadius: 2.5 }}>
              <Button
                fullWidth
                variant={!isSignUp ? "contained" : "text"}
                onClick={() => {
                  setIsSignUp(false);
                  setErrorMessage("");
                }}
                sx={{
                  borderRadius: 2,
                  py: 0.8,
                  bgcolor: !isSignUp ? "#7c4dff" : "transparent",
                  color: "#ffffff",
                  fontWeight: 700,
                }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant={isSignUp ? "contained" : "text"}
                onClick={() => {
                  setIsSignUp(true);
                  setErrorMessage("");
                }}
                sx={{
                  borderRadius: 2,
                  py: 0.8,
                  bgcolor: isSignUp ? "#7c4dff" : "transparent",
                  color: "#ffffff",
                  fontWeight: 700,
                }}
              >
                Register
              </Button>
            </Stack>

            {/* Provider Status Indicator */}
            <Box
              sx={{
                mb: 2.5,
                p: 1.4,
                borderRadius: 2.5,
                bgcolor: isSupabaseConfigured ? "rgba(0, 191, 166, 0.10)" : "rgba(124, 77, 255, 0.10)",
                border: `1px solid ${isSupabaseConfigured ? "rgba(0, 191, 166, 0.25)" : "rgba(124, 77, 255, 0.25)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: isSupabaseConfigured ? "#00bfa6" : "#7c4dff",
                    boxShadow: `0 0 8px ${isSupabaseConfigured ? "#00bfa6" : "#7c4dff"}`,
                  }}
                />
                <Typography variant="caption" sx={{ color: "#cbd5e1", fontWeight: 650 }}>
                  {isSupabaseConfigured ? "Supabase Auth Active" : "Local Workspace Mode"}
                </Typography>
              </Stack>
              {!isSupabaseConfigured && (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleDemoFill}
                  startIcon={<BoltRounded sx={{ fontSize: "0.95rem !important" }} />}
                  sx={{
                    fontSize: "0.72rem",
                    py: 0.2,
                    px: 1,
                    borderRadius: 1.5,
                    borderColor: "rgba(124, 77, 255, 0.4)",
                    color: "#a78bfa",
                  }}
                >
                  Quick Fill
                </Button>
              )}
            </Box>

            {errorMessage && (
              <Alert severity="error" sx={{ mb: 2.5 }} onClose={() => setErrorMessage("")}>
                {errorMessage}
              </Alert>
            )}

            {successMessage && (
              <Alert severity="success" sx={{ mb: 2.5 }} onClose={() => setSuccessMessage("")}>
                {successMessage}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.2}>
                {isSignUp && (
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutline sx={{ color: "text.secondary" }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}

                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlined sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                {!isSignUp && (
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          size="small"
                          sx={{ color: "text.secondary", "&.Mui-checked": { color: "#7c4dff" } }}
                        />
                      }
                      label={<Typography variant="caption" color="text.secondary">Remember this session</Typography>}
                    />
                  </Box>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <LoginRounded />}
                  sx={{
                    py: 1.3,
                    borderRadius: 2.5,
                    fontSize: "0.95rem",
                    fontWeight: 750,
                    background: "linear-gradient(135deg, #7c4dff 0%, #651fff 100%)",
                    boxShadow: "0 4px 18px rgba(124, 77, 255, 0.4)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #6e3dfc 0%, #591be6 100%)",
                    },
                  }}
                >
                  {loading ? "Authenticating..." : isSignUp ? "Create Workspace Account" : "Sign In to Dashboard"}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
}
