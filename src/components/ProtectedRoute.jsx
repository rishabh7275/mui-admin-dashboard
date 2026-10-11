import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#080d1a",
          color: "#f1f5f9",
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: "#7c4dff" }} size={48} thickness={4} />
        <Typography variant="body2" sx={{ color: "#94a3b8", fontWeight: 600 }}>
          Verifying session...
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
