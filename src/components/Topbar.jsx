import React, { useState } from "react";
import {
  DarkModeRounded,
  LightModeRounded,
  MenuRounded,
  NotificationsNoneRounded,
  PersonOutlineRounded,
  SettingsOutlined,
  LogoutRounded,
  CheckCircleOutlineRounded,
  ShoppingBagOutlined,
  WarningAmberRounded,
  NavigateNextRounded,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";

const routeMeta = {
  "/": {
    category: "Workspace",
    title: "Business Overview",
    desc: "Monitor revenue, customers and business performance.",
  },
  "/revenue-details": {
    category: "Analytics",
    title: "Revenue Details",
    desc: "Deep-dive financial breakdown, comparisons and period performance.",
  },
  "/conversion-analytics": {
    category: "Analytics",
    title: "Conversion Analytics",
    desc: "Funnel metrics, lead drop-offs and customer acquisition rates.",
  },
  "/users": {
    category: "Workspace",
    title: "User Management",
    desc: "Manage users, access permissions and review account activity.",
  },
  "/products": {
    category: "Workspace",
    title: "Product Inventory",
    desc: "Monitor catalog items, pricing tiers, stock and performance.",
  },
  "/orders": {
    category: "Workspace",
    title: "Order Management",
    desc: "Track orders, fulfillments, customer checkouts and payment logs.",
  },
  "/analytics": {
    category: "Workspace",
    title: "Performance Analytics",
    desc: "Explore business trends, growth indexes and performance insights.",
  },
  "/transactions": {
    category: "Workspace",
    title: "Transaction History",
    desc: "Review incoming payment batches, customer subscriptions and methods.",
  },
  "/settings": {
    category: "Workspace",
    title: "Workspace Settings",
    desc: "Configure platform settings, admin profiles and account notifications.",
  },
};

export default function Topbar({ mode, setMode, onMenu, onNotice, collapsed, setCollapsed }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = theme.palette.mode === "dark";

  // Notification menu state
  const [notifAnchor, setNotifAnchor] = useState(null);
  // Profile menu state
  const [profileAnchor, setProfileAnchor] = useState(null);

  const currentMeta = routeMeta[location.pathname] || {
    category: "Workspace",
    title: "Admin Console",
    desc: "Comprehensive analytics and workspace administration.",
  };

  const notifications = [
    {
      id: 1,
      title: "New order received #ORD-1049",
      time: "5 minutes ago",
      icon: <ShoppingBagOutlined color="primary" fontSize="small" />,
      unread: true,
    },
    {
      id: 2,
      title: "Payment of ₹24,500 completed",
      time: "25 minutes ago",
      icon: <CheckCircleOutlineRounded color="success" fontSize="small" />,
      unread: true,
    },
    {
      id: 3,
      title: "Monthly quota reached 78%",
      time: "2 hours ago",
      icon: <WarningAmberRounded color="warning" fontSize="small" />,
      unread: true,
    },
  ];

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${isDark ? "rgba(148, 163, 184, 0.12)" : "rgba(15, 23, 42, 0.08)"}`,
        bgcolor: isDark ? "rgba(8, 13, 26, 0.78)" : "rgba(255, 255, 255, 0.82)",
      }}
    >
      <Toolbar sx={{ gap: 1.5, py: 1.2, px: { xs: 2, sm: 3 }, minHeight: 68 }}>
        {/* Mobile Drawer Button */}
        <IconButton onClick={onMenu} sx={{ display: { md: "none" }, mr: 0.5 }}>
          <MenuRounded />
        </IconButton>

        {/* Dynamic Contextual Breadcrumbs and Page Heading */}
        <Box sx={{ flex: 1, minWidth: 0, py: 0.5 }}>
          <Breadcrumbs
            separator={<NavigateNextRounded sx={{ fontSize: 15, color: "text.secondary" }} />}
            aria-label="breadcrumb"
            sx={{ mb: 0.2 }}
          >
            <Typography
              component={RouterLink}
              to="/"
              variant="caption"
              sx={{
                color: "text.secondary",
                textDecoration: "none",
                fontWeight: 650,
                fontSize: "0.74rem",
                "&:hover": { color: "primary.main" },
              }}
            >
              {currentMeta.category}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "primary.main",
                fontWeight: 750,
                fontSize: "0.74rem",
              }}
            >
              {currentMeta.title}
            </Typography>
          </Breadcrumbs>

          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, flexWrap: "wrap" }}>
            <Typography variant="h6" fontWeight={850} sx={{ lineHeight: 1.2, letterSpacing: "-0.01em" }}>
              {currentMeta.title}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: { xs: "none", sm: "inline-block" },
                fontSize: "0.78rem",
              }}
            >
              — {currentMeta.desc}
            </Typography>
          </Box>
        </Box>

        {/* Light/Dark Mode Toggle */}
        <Tooltip title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}>
          <IconButton
            onClick={() => {
              const newMode = mode === "dark" ? "light" : "dark";
              setMode(newMode);
              onNotice(`Switched to ${newMode} mode`);
            }}
            sx={{
              bgcolor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
              "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" },
            }}
          >
            {mode === "dark" ? <LightModeRounded sx={{ color: "#facc15" }} /> : <DarkModeRounded />}
          </IconButton>
        </Tooltip>

        {/* Notifications Dropdown */}
        <Tooltip title="Notifications">
          <IconButton
            onClick={(e) => setNotifAnchor(e.currentTarget)}
            sx={{
              bgcolor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
              "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" },
            }}
          >
            <Badge badgeContent={3} color="secondary">
              <NotificationsNoneRounded />
            </Badge>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={notifAnchor}
          open={Boolean(notifAnchor)}
          onClose={() => setNotifAnchor(null)}
          slotProps={{
            paper: {
              sx: {
                width: 320,
                mt: 1.5,
                borderRadius: 3,
                boxShadow: isDark ? "0 14px 35px rgba(0,0,0,0.5)" : "0 14px 35px rgba(15,23,42,0.12)",
                border: `1px solid ${isDark ? "rgba(124,77,255,0.2)" : "rgba(15,23,42,0.08)"}`,
              },
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="subtitle2" fontWeight={800}>
              Notifications
            </Typography>
            <Typography
              variant="caption"
              color="primary.main"
              sx={{ cursor: "pointer", fontWeight: 700 }}
              onClick={() => {
                setNotifAnchor(null);
                onNotice("Marked all notifications as read");
              }}
            >
              Mark all read
            </Typography>
          </Box>
          <Divider />
          {notifications.map((n) => (
            <MenuItem
              key={n.id}
              onClick={() => {
                setNotifAnchor(null);
                onNotice(n.title);
              }}
              sx={{ py: 1.2, px: 2, gap: 1.5 }}
            >
              <Box sx={{ mt: 0.2 }}>{n.icon}</Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" fontWeight={650} noWrap>
                  {n.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {n.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
          <Divider />
          <MenuItem
            onClick={() => {
              setNotifAnchor(null);
              navigate("/orders");
            }}
            sx={{ justifyContent: "center", py: 1 }}
          >
            <Typography variant="caption" color="primary.main" fontWeight={750}>
              View all activity
            </Typography>
          </MenuItem>
        </Menu>

        {/* Profile Dropdown */}
        <Box
          onClick={(e) => setProfileAnchor(e.currentTarget)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            cursor: "pointer",
            p: 0.5,
            pr: { xs: 0.5, sm: 1.2 },
            borderRadius: 3,
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            },
          }}
        >
          <Avatar
            sx={{
              width: 38,
              height: 38,
              background: "linear-gradient(135deg, #7c4dff 0%, #651fff 100%)",
              fontWeight: 800,
              fontSize: "0.95rem",
              boxShadow: "0 2px 8px rgba(124, 77, 255, 0.35)",
            }}
          >
            RT
          </Avatar>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography variant="body2" fontWeight={800} lineHeight={1.2}>
              Rishabh Tiwari
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Administrator
            </Typography>
          </Box>
        </Box>

        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={() => setProfileAnchor(null)}
          slotProps={{
            paper: {
              sx: {
                width: 220,
                mt: 1.5,
                borderRadius: 3,
                boxShadow: isDark ? "0 14px 35px rgba(0,0,0,0.5)" : "0 14px 35px rgba(15,23,42,0.12)",
                border: `1px solid ${isDark ? "rgba(124,77,255,0.2)" : "rgba(15,23,42,0.08)"}`,
              },
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" fontWeight={800}>
              Rishabh Tiwari
            </Typography>
            <Typography variant="caption" color="text.secondary">
              rishabh@example.com
            </Typography>
          </Box>
          <Divider />
          <MenuItem
            onClick={() => {
              setProfileAnchor(null);
              navigate("/settings");
            }}
          >
            <ListItemIcon>
              <PersonOutlineRounded fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              setProfileAnchor(null);
              navigate("/settings");
            }}
          >
            <ListItemIcon>
              <SettingsOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              setProfileAnchor(null);
              onNotice("Signed out of session");
            }}
            sx={{ color: "error.main" }}
          >
            <ListItemIcon sx={{ color: "error.main" }}>
              <LogoutRounded fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}