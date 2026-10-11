import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  CssBaseline,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { getTheme } from "./theme/theme";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

const Login = lazy(() => import("./pages/Login"));
const Account = lazy(() => import("./pages/Account"));
const Users = lazy(() => import("./pages/Users"));
const Products = lazy(() => import("./pages/Products"));
const Orders = lazy(() => import("./pages/Orders"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Settings = lazy(() => import("./pages/Settings"));
const RevenueDetails = lazy(() => import("./pages/RevenueDetails"));
const ConversionAnalytics = lazy(() => import("./pages/ConversionAnalytics"));

export default function App() {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("mui_theme_mode") || "dark";
    } catch (e) {
      return "dark";
    }
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("mui_theme_mode", mode);
    } catch (e) {
      console.warn("Storage sync failed:", e);
    }
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);
  const showNotice = (message) => setNotice(message);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Public Login Route */}
        <Route
          path="/login"
          element={
            <Suspense
              fallback={
                <Box
                  sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#080d1a",
                  }}
                >
                  <CircularProgress sx={{ color: "#7c4dff" }} />
                </Box>
              }
            >
              <Login />
            </Suspense>
          }
        />

        {/* Protected Dashboard Workspace */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Box
                sx={{
                  display: "flex",
                  minHeight: "100vh",
                  bgcolor: "background.default",
                  backgroundImage:
                    mode === "dark"
                      ? "radial-gradient(ellipse 70% 45% at 20% -5%, rgba(124, 77, 255, 0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 85% 15%, rgba(0, 191, 166, 0.10) 0%, transparent 50%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(99, 102, 241, 0.08) 0%, transparent 60%)"
                      : "radial-gradient(ellipse 70% 45% at 20% -5%, rgba(124, 77, 255, 0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 85% 15%, rgba(0, 191, 166, 0.04) 0%, transparent 50%)",
                  backgroundAttachment: "fixed",
                }}
              >
                <Sidebar
                  mobileOpen={mobileOpen}
                  setMobileOpen={setMobileOpen}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                />
                <Box
                  className={`dashboard-main-content ${collapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    overflowX: "hidden",
                    transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <Topbar
                    mode={mode}
                    setMode={setMode}
                    onMenu={() => setMobileOpen(true)}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    onNotice={showNotice}
                  />
                  <Box component="main" sx={{ width: "100%", p: { xs: 2, sm: 2.5, md: 3 }, flex: 1 }}>
                    <Suspense
                      fallback={
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                          <CircularProgress color="primary" />
                        </Box>
                      }
                    >
                      <Routes>
                        <Route path="/" element={<Dashboard onNotice={showNotice} />} />
                        <Route path="/account" element={<Account onNotice={showNotice} />} />
                        <Route path="/revenue-details" element={<RevenueDetails onNotice={showNotice} />} />
                        <Route path="/conversion-analytics" element={<ConversionAnalytics onNotice={showNotice} />} />
                        <Route path="/users" element={<Users onNotice={showNotice} />} />
                        <Route path="/products" element={<Products onNotice={showNotice} />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/settings" element={<Settings onNotice={showNotice} mode={mode} setMode={setMode} />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </Suspense>
                  </Box>
                </Box>
              </Box>
            </ProtectedRoute>
          }
        />
      </Routes>

      <Snackbar
        open={Boolean(notice)}
        autoHideDuration={2800}
        onClose={() => setNotice("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setNotice("")}>
          {notice}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}