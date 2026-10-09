import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#7c4dff",
        light: "#9e77ff",
        dark: "#5c2ecb",
      },
      secondary: {
        main: "#00bfa6",
        light: "#33ccb8",
        dark: "#008f7c",
      },
      background:
        mode === "dark"
          ? {
              default: "#080d1a",
              paper: "#0f172a",
            }
          : {
              default: "#f8fafc",
              paper: "#ffffff",
            },
      text:
        mode === "dark"
          ? {
              primary: "#f1f5f9",
              secondary: "#94a3b8",
            }
          : {
              primary: "#0f172a",
              secondary: "#64748b",
            },
      divider:
        mode === "dark"
          ? "rgba(148, 163, 184, 0.12)"
          : "rgba(15, 23, 42, 0.08)",
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontWeight: 800, letterSpacing: "-0.03em" },
      h5: { fontWeight: 750, letterSpacing: "-0.02em" },
      h6: { fontWeight: 750, letterSpacing: "-0.01em" },
      button: { textTransform: "none", fontWeight: 700 },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            border:
              mode === "dark"
                ? "1px solid rgba(124, 77, 255, 0.18)"
                : "1px solid rgba(15, 23, 42, 0.08)",
            boxShadow:
              mode === "dark"
                ? "0 10px 30px -10px rgba(0, 0, 0, 0.45), 0 0 15px -3px rgba(124, 77, 255, 0.05)"
                : "0 10px 30px -10px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04)",
            backgroundImage: "none",
            transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
            "&:hover": {
              borderColor:
                mode === "dark"
                  ? "rgba(124, 77, 255, 0.32)"
                  : "rgba(124, 77, 255, 0.25)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 12,
            transition: "all 0.2s ease-in-out",
          },
          contained: {
            background: "linear-gradient(135deg, #7c4dff 0%, #651fff 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #6e3dfc 0%, #591be6 100%)",
              boxShadow: "0 4px 14px rgba(124, 77, 255, 0.35)",
            },
          },
        },
      },
    },
  });