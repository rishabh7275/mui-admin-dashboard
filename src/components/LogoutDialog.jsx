import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { LogoutRounded, WarningAmberRounded } from "@mui/icons-material";

export default function LogoutDialog({ open, onClose, onConfirm, loading }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3.5,
            p: 1,
            bgcolor: isDark ? "#0f172a" : "#ffffff",
            backgroundImage: "none",
            border: `1px solid ${isDark ? "rgba(124, 77, 255, 0.22)" : "rgba(15, 23, 42, 0.08)"}`,
            boxShadow: isDark
              ? "0 20px 45px rgba(0,0,0,0.6), 0 0 20px -3px rgba(124,77,255,0.15)"
              : "0 20px 45px rgba(15,23,42,0.15)",
          },
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2.5,
            bgcolor: "rgba(239, 68, 68, 0.12)",
            color: "#ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WarningAmberRounded fontSize="medium" />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={800} lineHeight={1.2}>
            Confirm Logout
          </Typography>
          <Typography variant="caption" color="text.secondary">
            End your current session
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ py: 1.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          Are you sure you want to log out of your workspace? You will need to enter your credentials again to regain access to dashboard analytics and administrative controls.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1.5 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={loading}
          sx={{
            flex: 1,
            borderRadius: 2.5,
            borderColor: isDark ? "rgba(148, 163, 184, 0.25)" : "rgba(15, 23, 42, 0.15)",
            color: isDark ? "#cbd5e1" : "#475569",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: "transparent",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <LogoutRounded />}
          sx={{
            flex: 1,
            borderRadius: 2.5,
            bgcolor: "#ef4444",
            "&:hover": {
              bgcolor: "#dc2626",
            },
          }}
        >
          {loading ? "Logging out..." : "Log Out"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
