import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { RefreshRounded, ErrorOutlineRounded } from "@mui/icons-material";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Dashboard caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            p: 3,
            bgcolor: "#080d1a",
            color: "#f1f5f9",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              maxWidth: 520,
              width: "100%",
              textAlign: "center",
              bgcolor: "#0f172a",
              border: "1px solid rgba(124, 77, 255, 0.25)",
              borderRadius: 3,
            }}
          >
            <ErrorOutlineRounded sx={{ fontSize: 64, color: "#f87171", mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#fff" }}>
              Something went wrong
            </Typography>
            <Typography variant="body2" sx={{ color: "#94a3b8", mb: 3 }}>
              An unexpected error occurred while loading this view. You can reload the page to restore the dashboard.
            </Typography>
            <Button
              variant="contained"
              startIcon={<RefreshRounded />}
              onClick={this.handleReload}
              sx={{
                background: "linear-gradient(135deg, #7c4dff 0%, #651fff 100%)",
                px: 3,
                py: 1,
              }}
            >
              Reload Dashboard
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}
