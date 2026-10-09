import React from "react";
import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  CssBaseline,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { getTheme } from "./theme/theme";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Analytics from "./pages/Analytics";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import RevenueDetails from "./pages/RevenueDetails";
import ConversionAnalytics from "./pages/ConversionAnalytics";

export default function App() {
  const [mode, setMode] = useState("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const theme = useMemo(() => getTheme(mode), [mode]);

  const showNotice = (message) => setNotice(message);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
            <Routes>
              <Route path="/" element={<Dashboard onNotice={showNotice} />} />
              <Route path="/revenue-details" element={<RevenueDetails onNotice={showNotice} />} />
              <Route path="/conversion-analytics" element={<ConversionAnalytics onNotice={showNotice} />} />
              <Route path="/users" element={<Users onNotice={showNotice} />} />
              <Route path="/products" element={<Products onNotice={showNotice} />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/settings" element={<Settings onNotice={showNotice} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Box>
      </Box>
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