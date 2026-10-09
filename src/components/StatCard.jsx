import React from "react";
import { ArrowDownwardRounded, ArrowUpwardRounded } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, Chip, Typography, useTheme } from "@mui/material";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  positive = true,
  sparklineData = [35, 45, 40, 60, 55, 75, 70, 85],
  onClick,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const strokeColor = positive ? theme.palette.secondary.main : "#f43f5e";
  const gradientId = `sparkline-${title.replace(/\s+/g, "-").toLowerCase()}`;

  const chartData = sparklineData.map((val, idx) => ({ i: idx, v: val }));

  return (
    <Card
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      sx={{
        height: "100%",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: onClick ? "pointer" : "default",
        outline: "none",
        transition: "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
        "&:hover": {
          transform: onClick ? "translateY(-5px)" : "translateY(-2px)",
          boxShadow: isDark
            ? "0 16px 32px rgba(0,0,0,0.5), 0 0 24px -2px rgba(124,77,255,0.22)"
            : "0 16px 32px rgba(15,23,42,0.1)",
          borderColor: onClick
            ? isDark ? "rgba(124,77,255,0.45)" : "rgba(124,77,255,0.4)"
            : undefined,
          "& .stat-icon": {
            transform: "scale(1.1) rotate(5deg)",
          },
        },
        "&:focus-visible": {
          borderColor: "primary.main",
          boxShadow: "0 0 0 3px rgba(124, 77, 255, 0.35)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 120,
          height: 120,
          borderRadius: "50%",
          bgcolor: "primary.main",
          opacity: isDark ? 0.08 : 0.05,
          right: -35,
          top: -35,
          pointerEvents: "none",
        }}
      />
      <CardContent sx={{ p: 2.5, pb: 1.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography color="text.secondary" variant="body2" fontWeight={700}>
            {title}
          </Typography>
          <Avatar
            className="stat-icon"
            sx={{
              bgcolor: isDark ? "rgba(124,77,255,0.15)" : "rgba(124,77,255,0.10)",
              color: "primary.main",
              width: 44,
              height: 44,
              transition: "transform 0.25s ease",
            }}
          >
            <Icon fontSize="small" />
          </Avatar>
        </Box>
        <Typography variant="h5" sx={{ mt: 1.5, fontWeight: 900 }}>
          {value}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1.5 }}>
          <Chip
            size="small"
            icon={positive ? <ArrowUpwardRounded sx={{ "&&": { fontSize: 16 } }} /> : <ArrowDownwardRounded sx={{ "&&": { fontSize: 16 } }} />}
            label={`${change} vs last month`}
            color={positive ? "success" : "error"}
            variant="outlined"
            sx={{
              fontWeight: 700,
              fontSize: "0.75rem",
              bgcolor: positive
                ? isDark ? "rgba(46, 125, 50, 0.12)" : "rgba(46, 125, 50, 0.06)"
                : isDark ? "rgba(211, 47, 47, 0.12)" : "rgba(211, 47, 47, 0.06)",
              borderColor: positive ? "rgba(46, 125, 50, 0.3)" : "rgba(211, 47, 47, 0.3)",
            }}
          />
        </Box>
      </CardContent>

      {/* Small Sparkline */}
      <Box sx={{ height: 46, width: "100%", mt: "auto", px: 1, pb: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity={0.35} />
                <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={strokeColor}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}