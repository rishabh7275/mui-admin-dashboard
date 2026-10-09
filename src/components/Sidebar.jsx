import React from "react";
import {
  AssessmentRounded,
  BarChartRounded,
  ChevronLeftRounded,
  CloseRounded,
  DashboardRounded,
  Inventory2Rounded,
  MenuRounded,
  PeopleAltRounded,
  ReceiptLongRounded,
  SettingsRounded,
  ShoppingCartRounded,
  WalletRounded,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const drawerWidth = 266;
const collapsedWidth = 76;

const nav = [
  ["Dashboard", "/", DashboardRounded],
  ["Users", "/users", PeopleAltRounded],
  ["Products", "/products", Inventory2Rounded],
  ["Orders", "/orders", ShoppingCartRounded],
  ["Analytics", "/analytics", BarChartRounded],
  ["Transactions", "/transactions", WalletRounded],
];

export default function Sidebar({ mobileOpen, setMobileOpen, collapsed, setCollapsed }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const content = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        width: "100%",
      }}
    >
      {/* Top Header with Brand and ChatGPT-style Toggle */}
      <Box
        sx={{
          px: collapsed ? 1.5 : 2.5,
          py: 2.2,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          minHeight: 68,
          transition: "padding 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {!collapsed && (
          <Box sx={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: "0.04em", lineHeight: 1.2 }}>
              Rishabh<span style={{ color: "#7c4dff" }}>.</span>
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 750, letterSpacing: "0.06em", fontSize: "0.7rem" }}>
              ADMIN CONSOLE
            </Typography>
          </Box>
        )}

        {/* Minimal ChatGPT-Style Sidebar Toggle Button */}
        <Tooltip title={collapsed ? "Open sidebar" : "Close sidebar"} placement="right" arrow>
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
            sx={{
              display: { xs: "none", md: "flex" },
              width: 40,
              height: 40,
              p: 1,
              bgcolor: "transparent",
              color: isDark ? "rgba(255, 255, 255, 0.85)" : "rgba(15, 23, 42, 0.85)",
              borderRadius: 2,
              transition: "background-color 0.18s ease, color 0.18s ease",
              "&:hover": {
                bgcolor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
                color: isDark ? "#ffffff" : "#0f172a",
              },
            }}
          >
            {collapsed ? (
              <MenuRounded sx={{ fontSize: 24 }} />
            ) : (
              <MenuRounded sx={{ fontSize: 24 }} />
            )}
          </IconButton>
        </Tooltip>

        {/* Mobile Drawer Close */}
        <IconButton
          onClick={() => setMobileOpen(false)}
          sx={{
            display: { md: "none" },
            width: 40,
            height: 40,
            bgcolor: "transparent",
            color: isDark ? "rgba(255, 255, 255, 0.85)" : "rgba(15, 23, 42, 0.85)",
            "&:hover": {
              bgcolor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
            },
          }}
        >
          <CloseRounded sx={{ fontSize: 22 }} />
        </IconButton>
      </Box>

      <Divider />

      {/* Category Header */}
      {!collapsed && (
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{
            px: 2.5,
            pt: 2.2,
            pb: 0.8,
            fontWeight: 800,
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
          }}
        >
          Workspace
        </Typography>
      )}

      {/* Navigation Items */}
      <List sx={{ px: collapsed ? 1 : 1.5, py: collapsed ? 1.5 : 0.5, transition: "padding 0.28s cubic-bezier(0.4, 0, 0.2, 1)" }}>
        {nav.map(([label, path, Icon]) => (
          <Tooltip
            key={path}
            title={collapsed ? label : ""}
            placement="right"
            arrow
            disableHoverListener={!collapsed}
          >
            <ListItemButton
              component={NavLink}
              to={path}
              end={path === "/"}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 2.5,
                mb: 0.6,
                justifyContent: collapsed ? "center" : "flex-start",
                px: collapsed ? 0 : 1.6,
                minHeight: 44,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: isDark ? "rgba(124,77,255,0.10)" : "rgba(124,77,255,0.06)",
                },
                "&.active": {
                  bgcolor: isDark ? "rgba(124,77,255,0.18)" : "rgba(124,77,255,0.12)",
                  color: "primary.main",
                  boxShadow: isDark ? "0 2px 10px rgba(124,77,255,0.15)" : "0 2px 8px rgba(124,77,255,0.08)",
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed ? 0 : 38,
                  justifyContent: "center",
                  color: "text.secondary",
                  transition: "color 0.2s ease",
                }}
              >
                <Icon fontSize="small" />
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontSize: "0.88rem",
                    fontWeight: 650,
                    noWrap: true,
                  }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>

      <Box sx={{ flex: 1 }} />

      {/* Settings Item */}
      <List sx={{ px: collapsed ? 1 : 1.5, pb: 1, transition: "padding 0.28s cubic-bezier(0.4, 0, 0.2, 1)" }}>
        <Tooltip
          title={collapsed ? "Settings" : ""}
          placement="right"
          arrow
          disableHoverListener={!collapsed}
        >
          <ListItemButton
            component={NavLink}
            to="/settings"
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: 2.5,
              mb: 0.5,
              justifyContent: collapsed ? "center" : "flex-start",
              px: collapsed ? 0 : 1.6,
              minHeight: 44,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: isDark ? "rgba(124,77,255,0.10)" : "rgba(124,77,255,0.06)",
              },
              "&.active": {
                bgcolor: isDark ? "rgba(124,77,255,0.18)" : "rgba(124,77,255,0.12)",
                color: "primary.main",
                "& .MuiListItemIcon-root": {
                  color: "primary.main",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: collapsed ? 0 : 38,
                justifyContent: "center",
                color: "text.secondary",
              }}
            >
              <SettingsRounded fontSize="small" />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{
                  fontSize: "0.88rem",
                  fontWeight: 650,
                  noWrap: true,
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </List>

      {/* Pro Workspace Card (only shown when expanded) */}
      {!collapsed && (
        <Box
          sx={{
            m: 1.5,
            p: 2,
            borderRadius: 3,
            bgcolor: isDark ? "rgba(124,77,255,0.10)" : "rgba(124,77,255,0.06)",
            border: `1px solid ${isDark ? "rgba(124,77,255,0.2)" : "rgba(124,77,255,0.1)"}`,
          }}
        >
          <Typography variant="subtitle2" fontWeight={800}>
            Pro Workspace
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.3, lineHeight: 1.4 }}>
            78% of monthly analytics quota used.
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Desktop Persistent Rail/Full Drawer */}
      <Drawer
        variant="permanent"
        className={`app-sidebar ${collapsed ? "sidebar-collapsed collapsed" : "sidebar-expanded expanded"}`}
        sx={{
          display: { xs: "none", md: "block" },
          width: collapsed ? collapsedWidth : drawerWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          transition: "width 250ms cubic-bezier(0.4, 0, 0.2, 1)",
          "& .MuiDrawer-paper": {
            width: collapsed ? collapsedWidth : drawerWidth,
            boxSizing: "border-box",
            borderRight: `1px solid ${isDark ? "rgba(148, 163, 184, 0.12)" : "rgba(15, 23, 42, 0.08)"}`,
            bgcolor: isDark ? "#0b1222" : "#ffffff",
            overflowX: "hidden",
            transition: "width 250ms cubic-bezier(0.4, 0, 0.2, 1)",
          },
        }}
      >
        {content}
      </Drawer>

      {/* Mobile Drawer (Compact Overlay) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        className="app-sidebar-mobile"
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: isDark ? "#0b1222" : "#ffffff",
            borderRight: `1px solid ${isDark ? "rgba(148, 163, 184, 0.12)" : "rgba(15, 23, 42, 0.08)"}`,
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        {content}
      </Drawer>
    </>
  );
}