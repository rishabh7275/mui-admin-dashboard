import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowForwardRounded,
  AttachMoneyRounded,
  PeopleAltRounded,
  ShoppingBagRounded,
  TrendingUpRounded,
  CalendarTodayRounded,
  InfoOutlined,
  OpenInNewRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";
import StatCard from "../components/StatCard";
import ReportModal from "../components/ReportModal";
import {
  revenueMonthlyData,
  revenueQuarterlyData,
  goalProgressMetrics,
} from "../data/mockData";

const transactions = [
  { name: "Rahul Sharma", plan: "Enterprise Plan", amount: "₹24,500", status: "Completed", date: "Today, 02:45 PM" },
  { name: "Priya Singh", plan: "Pro Plan", amount: "₹12,900", status: "Completed", date: "Today, 11:20 AM" },
  { name: "Aman Verma", plan: "Starter Plan", amount: "₹5,400", status: "Pending", date: "Yesterday, 05:15 PM" },
  { name: "Neha Gupta", plan: "Enterprise Plan", amount: "₹31,200", status: "Completed", date: "Yesterday, 01:10 PM" },
];

export default function Dashboard({ onNotice }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === "dark";

  const [selectedYear, setSelectedYear] = useState(2026);
  const [viewMode, setViewMode] = useState("Monthly"); // "Monthly" or "Quarterly"
  const [reportOpen, setReportOpen] = useState(false);

  const chartData =
    viewMode === "Monthly"
      ? revenueMonthlyData[selectedYear]
      : revenueQuarterlyData[selectedYear];

  const formatCurrency = (val) => `₹${(val / 1000).toFixed(0)}k`;

  return (
    <Stack spacing={3}>
      {/* Welcome Banner */}
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Box>
          <Typography variant="h4">Good morning, Rishabh 👋</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Here is what is happening with your business today.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<TrendingUpRounded />}
          onClick={() => setReportOpen(true)}
          sx={{ px: 2.5, py: 1 }}
        >
          Generate Report
        </Button>
      </Box>

      {/* Clickable KPI Cards */}
      <Grid container spacing={2.2}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Revenue"
            value="₹8.45L"
            change="+12.5%"
            icon={AttachMoneyRounded}
            sparklineData={[35, 45, 42, 60, 58, 75, 70, 88]}
            onClick={() => navigate("/revenue-details")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Users"
            value="12,458"
            change="+8.2%"
            icon={PeopleAltRounded}
            sparklineData={[50, 55, 62, 59, 70, 78, 85, 92]}
            onClick={() => navigate("/users")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Orders"
            value="2,845"
            change="+15.4%"
            icon={ShoppingBagRounded}
            sparklineData={[28, 38, 48, 42, 58, 64, 78, 85]}
            onClick={() => navigate("/orders")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Conversion Rate"
            value="18.6%"
            change="+4.8%"
            icon={TrendingUpRounded}
            sparklineData={[12, 14, 13, 16, 15, 17, 18, 19]}
            onClick={() => navigate("/conversion-analytics")}
          />
        </Grid>
      </Grid>

      {/* Main Charts & Goals Section */}
      <Grid container spacing={2.2}>
        {/* Revenue Overview Recharts Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ p: 2.8, flex: 1, display: "flex", flexDirection: "column" }}>
              {/* Header with Title and Interactive Controls */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  mb: 2.5,
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6" fontWeight={800}>
                      Revenue Overview
                    </Typography>
                    <Tooltip title="Open detailed Revenue breakdown & ledger">
                      <Button
                        size="small"
                        endIcon={<OpenInNewRounded sx={{ fontSize: "14px !important" }} />}
                        onClick={() => navigate("/revenue-details")}
                        sx={{ fontSize: "0.75rem", py: 0.2, px: 0.8, color: "primary.main" }}
                      >
                        Details
                      </Button>
                    </Tooltip>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      {viewMode} Performance
                    </Typography>
                    <Chip
                      label="+18.4% YoY"
                      size="small"
                      color="success"
                      sx={{ fontWeight: 700, fontSize: "0.75rem", height: 22 }}
                    />
                  </Box>
                </Box>

                {/* Filter Controls: Monthly/Quarterly Toggle & Year Select */}
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <ButtonGroup size="small" variant="outlined" sx={{ borderRadius: 2 }}>
                    <Button
                      variant={viewMode === "Monthly" ? "contained" : "outlined"}
                      onClick={() => setViewMode("Monthly")}
                      sx={{ fontSize: "0.78rem", py: 0.5, px: 1.5 }}
                    >
                      Monthly
                    </Button>
                    <Button
                      variant={viewMode === "Quarterly" ? "contained" : "outlined"}
                      onClick={() => setViewMode("Quarterly")}
                      sx={{ fontSize: "0.78rem", py: 0.5, px: 1.5 }}
                    >
                      Quarterly
                    </Button>
                  </ButtonGroup>

                  <Select
                    size="small"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    sx={{
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      borderRadius: 2,
                      minWidth: 92,
                      "& .MuiSelect-select": { py: 0.6, px: 1.5 },
                    }}
                  >
                    <MenuItem value={2026}>2026</MenuItem>
                    <MenuItem value={2025}>2025</MenuItem>
                  </Select>
                </Stack>
              </Box>

              {/* Responsive Recharts Container */}
              <Box sx={{ width: "100%", height: 320, mt: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="revenueThisYear" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7c4dff" stopOpacity={0.45} />
                        <stop offset="90%" stopColor="#7c4dff" stopOpacity={0.01} />
                      </linearGradient>
                      <linearGradient id="revenueLastYear" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00bfa6" stopOpacity={0.35} />
                        <stop offset="90%" stopColor="#00bfa6" stopOpacity={0.01} />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}
                      vertical={false}
                    />

                    <XAxis
                      dataKey="period"
                      stroke={theme.palette.text.secondary}
                      tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                      axisLine={{ stroke: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
                      tickLine={false}
                    />

                    <YAxis
                      stroke={theme.palette.text.secondary}
                      tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                      tickFormatter={formatCurrency}
                      axisLine={false}
                      tickLine={false}
                    />

                    <RechartsTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <Box
                              sx={{
                                bgcolor: isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.98)",
                                border: `1px solid ${isDark ? "rgba(124, 77, 255, 0.3)" : "rgba(15, 23, 42, 0.15)"}`,
                                borderRadius: 2,
                                p: 1.5,
                                boxShadow: isDark ? "0 8px 24px rgba(0,0,0,0.5)" : "0 8px 24px rgba(0,0,0,0.12)",
                                backdropFilter: "blur(8px)",
                              }}
                            >
                              <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", display: "block", mb: 0.8 }}>
                                {label} {selectedYear}
                              </Typography>
                              {payload.map((entry, index) => (
                                <Box
                                  key={`item-${index}`}
                                  sx={{ display: "flex", alignItems: "center", gap: 1.2, my: 0.3 }}
                                >
                                  <Box
                                    sx={{
                                      width: 8,
                                      height: 8,
                                      borderRadius: "50%",
                                      bgcolor: entry.color,
                                    }}
                                  />
                                  <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 70 }}>
                                    {entry.name}:
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 800, ml: "auto" }}>
                                    ₹{entry.value.toLocaleString()}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          );
                        }
                        return null;
                      }}
                    />

                    <Legend
                      verticalAlign="top"
                      align="right"
                      wrapperStyle={{ paddingBottom: 15 }}
                      iconType="circle"
                      iconSize={8}
                      formatter={(value) => (
                        <span style={{ color: theme.palette.text.secondary, fontSize: "0.8rem", fontWeight: 600 }}>
                          {value}
                        </span>
                      )}
                    />

                    <Area
                      type="monotone"
                      name={`This Year (${selectedYear})`}
                      dataKey="thisYear"
                      stroke="#7c4dff"
                      strokeWidth={2.8}
                      fillOpacity={1}
                      fill="url(#revenueThisYear)"
                      activeDot={{ r: 6, fill: "#7c4dff", stroke: "#ffffff", strokeWidth: 2 }}
                    />
                    <Area
                      type="monotone"
                      name={`Last Year (${selectedYear - 1})`}
                      dataKey="lastYear"
                      stroke="#00bfa6"
                      strokeWidth={2.2}
                      strokeDasharray="4 4"
                      fillOpacity={1}
                      fill="url(#revenueLastYear)"
                      activeDot={{ r: 5, fill: "#00bfa6", stroke: "#ffffff", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Goal Progress Card */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ p: 2.8, flex: 1, display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="h6" fontWeight={800}>Goal Progress</Typography>
                  <Typography color="text.secondary" variant="body2">Monthly business targets</Typography>
                </Box>
                <Chip
                  label="Q4 Goals"
                  size="small"
                  variant="outlined"
                  sx={{ fontWeight: 700, borderColor: "rgba(124, 77, 255, 0.4)", color: "primary.main" }}
                />
              </Box>

              <Stack spacing={2.8} sx={{ mt: 3.5, flex: 1, justifyContent: "space-around" }}>
                {goalProgressMetrics.map(({ label, value, current, target, description, color }) => (
                  <Box key={label}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 0.8 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                        <Typography variant="body2" fontWeight={750}>
                          {label}
                        </Typography>
                        <Tooltip title={description} arrow placement="top">
                          <InfoOutlined sx={{ fontSize: 14, color: "text.secondary", cursor: "pointer" }} />
                        </Tooltip>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                        <Typography variant="body2" fontWeight={800} sx={{ color }}>
                          {value}%
                        </Typography>
                      </Box>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={value}
                      sx={{
                        height: 9,
                        borderRadius: 10,
                        bgcolor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 10,
                          background: `linear-gradient(90deg, #7c4dff 0%, ${color} 100%)`,
                          transition: "transform 0.4s ease",
                        },
                      }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
                        Current: <strong>{current}</strong>
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
                        Target: {target}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Transactions Card */}
      <Card>
        <CardContent sx={{ p: 2.8 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
            <Box>
              <Typography variant="h6" fontWeight={800}>Recent Transactions</Typography>
              <Typography variant="body2" color="text.secondary">Latest customer payments & subscriptions</Typography>
            </Box>
            <Button
              endIcon={<ArrowForwardRounded />}
              onClick={() => {
                onNotice("Opening all transactions");
                navigate("/transactions");
              }}
              sx={{ fontWeight: 700 }}
            >
              View all
            </Button>
          </Box>

          <Stack divider={<Divider sx={{ opacity: isDark ? 0.3 : 0.6 }} />} spacing={0}>
            {transactions.map(({ name, plan, amount, status, date }) => (
              <Box
                key={name}
                sx={{
                  py: 1.8,
                  px: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: 2,
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    bgcolor: isDark ? "rgba(124,77,255,0.06)" : "rgba(124,77,255,0.03)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2.5,
                    display: "grid",
                    placeItems: "center",
                    background: "linear-gradient(135deg, rgba(124,77,255,0.2) 0%, rgba(0,191,166,0.15) 100%)",
                    border: "1px solid rgba(124,77,255,0.2)",
                    color: "primary.main",
                    fontWeight: 900,
                    fontSize: "1.05rem",
                    flexShrink: 0,
                  }}
                >
                  {name[0]}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography fontWeight={750} noWrap>{name}</Typography>
                  <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "block" }}>
                    {plan} • {date}
                  </Typography>
                </Box>
                <Typography fontWeight={850} sx={{ letterSpacing: "-0.01em", flexShrink: 0 }}>
                  {amount}
                </Typography>
                <Chip
                  label={status}
                  color={status === "Completed" ? "success" : "warning"}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    flexShrink: 0,
                    bgcolor:
                      status === "Completed"
                        ? isDark ? "rgba(46, 125, 50, 0.16)" : "rgba(46, 125, 50, 0.08)"
                        : isDark ? "rgba(237, 108, 2, 0.16)" : "rgba(237, 108, 2, 0.08)",
                  }}
                />
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Interactive Report Generation Dialog */}
      <ReportModal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        onNotice={onNotice}
      />
    </Stack>
  );
}