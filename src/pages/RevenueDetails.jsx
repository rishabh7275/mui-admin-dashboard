import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowBackRounded,
  TrendingUpRounded,
  TrendingDownRounded,
  AttachMoneyRounded,
  ReceiptLongRounded,
  FileDownloadRounded,
  FilterListRounded,
  StarRounded,
  ShowChartRounded,
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
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  revenueMonthlyData,
  revenueQuarterlyData,
  revenueStreamsData,
  recentTransactionsList,
} from "../data/mockData";

export default function RevenueDetails({ onNotice }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === "dark";

  const [selectedYear, setSelectedYear] = useState(2026);
  const [viewMode, setViewMode] = useState("Monthly"); // "Monthly" or "Quarterly"
  const [statusFilter, setStatusFilter] = useState("All");

  const currentDataset =
    viewMode === "Monthly"
      ? revenueMonthlyData[selectedYear]
      : revenueQuarterlyData[selectedYear];

  // Derived Metrics calculated from current dataset
  const metrics = useMemo(() => {
    const totalCurrent = currentDataset.reduce((acc, d) => acc + d.thisYear, 0);
    const totalPrevious = currentDataset.reduce((acc, d) => acc + d.lastYear, 0);
    const avgCurrent = Math.round(totalCurrent / currentDataset.length);
    const growth = (((totalCurrent - totalPrevious) / totalPrevious) * 100).toFixed(1);

    // Best-performing period
    let best = currentDataset[0];
    currentDataset.forEach((d) => {
      if (d.thisYear > best.thisYear) best = d;
    });

    return {
      totalCurrent,
      totalPrevious,
      avgCurrent,
      growth,
      bestPeriod: best.period,
      bestAmount: best.thisYear,
    };
  }, [currentDataset]);

  // Filtered transactions for this page
  const filteredTransactions = useMemo(() => {
    if (statusFilter === "All") return recentTransactionsList;
    return recentTransactionsList.filter((t) => t.status === statusFilter);
  }, [statusFilter]);

  const formatCurrency = (val) => `₹${(val / 1000).toFixed(0)}k`;

  // CSV Export for revenue details
  const exportRevenueCSV = () => {
    const headers = ["Period", `This Year (${selectedYear})`, `Last Year (${selectedYear - 1})`, "Transactions Logged"];
    const rows = currentDataset.map((d) => [d.period, d.thisYear, d.lastYear, d.transactions || "N/A"]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `revenue_details_${selectedYear}_${viewMode.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onNotice(`Downloaded ${viewMode} Revenue breakdown for ${selectedYear}`);
  };

  return (
    <Stack spacing={3}>
      {/* Header with Navigation and Filter controls */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button
            variant="outlined"
            size="small"
            startIcon={<ArrowBackRounded />}
            onClick={() => navigate("/")}
            sx={{ borderRadius: 2.5 }}
          >
            Dashboard
          </Button>
          <Box>
            <Typography variant="h5" fontWeight={850}>
              Revenue Details & Analytics
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Audited financial breakdown across monthly cycles and business streams.
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <ButtonGroup size="small" variant="outlined" sx={{ borderRadius: 2 }}>
            <Button
              variant={viewMode === "Monthly" ? "contained" : "outlined"}
              onClick={() => setViewMode("Monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={viewMode === "Quarterly" ? "contained" : "outlined"}
              onClick={() => setViewMode("Quarterly")}
            >
              Quarterly
            </Button>
          </ButtonGroup>

          <Select
            size="small"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            sx={{ minWidth: 100, fontWeight: 750, borderRadius: 2 }}
          >
            <MenuItem value={2026}>2026</MenuItem>
            <MenuItem value={2025}>2025</MenuItem>
          </Select>

          <Button
            variant="outlined"
            size="small"
            startIcon={<FileDownloadRounded />}
            onClick={exportRevenueCSV}
            sx={{ borderRadius: 2 }}
          >
            Export CSV
          </Button>
        </Stack>
      </Box>

      {/* KPI Summary Cards */}
      <Grid container spacing={2.2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={750}>
                TOTAL REVENUE ({selectedYear})
              </Typography>
              <Typography variant="h5" fontWeight={900} sx={{ mt: 1 }}>
                ₹{(metrics.totalCurrent / 100000).toFixed(2)}L
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 1 }}>
                <Chip
                  icon={metrics.growth >= 0 ? <TrendingUpRounded sx={{ fontSize: 16 }} /> : <TrendingDownRounded sx={{ fontSize: 16 }} />}
                  label={`+${metrics.growth}% YoY`}
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{ fontWeight: 700 }}
                />
                <Typography variant="caption" color="text.secondary">
                  vs ₹{(metrics.totalPrevious / 100000).toFixed(2)}L
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={750}>
                AVG {viewMode.toUpperCase()} REVENUE
              </Typography>
              <Typography variant="h5" fontWeight={900} sx={{ mt: 1 }}>
                ₹{(metrics.avgCurrent / 1000).toFixed(1)}k
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                Calculated across {currentDataset.length} periods
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={750}>
                PEAK PERFORMING PERIOD
              </Typography>
              <Typography variant="h5" fontWeight={900} sx={{ mt: 1, color: "primary.light" }}>
                {metrics.bestPeriod} ({formatCurrency(metrics.bestAmount)})
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                Highest revenue generated
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={750}>
                NET PROFIT MARGIN
              </Typography>
              <Typography variant="h5" fontWeight={900} sx={{ mt: 1, color: "secondary.main" }}>
                76.8%
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                +3.4% margin expansion
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Comparison Chart & Revenue Streams Breakdown */}
      <Grid container spacing={2.2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ p: 2.8, flex: 1, display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight={800}>
                    Year-Over-Year Revenue Trajectory
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Comparing {selectedYear} actuals against {selectedYear - 1} benchmark
                  </Typography>
                </Box>
                <Chip
                  label={`${viewMode} View`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 750 }}
                />
              </Box>

              <Box sx={{ width: "100%", height: 320, mt: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentDataset} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="detailThisYear" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7c4dff" stopOpacity={0.45} />
                        <stop offset="90%" stopColor="#7c4dff" stopOpacity={0.01} />
                      </linearGradient>
                      <linearGradient id="detailLastYear" x1="0" y1="0" x2="0" y2="1">
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
                                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                              }}
                            >
                              <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary" }}>
                                {label} {selectedYear}
                              </Typography>
                              {payload.map((entry, index) => (
                                <Box key={`tt-${index}`} sx={{ display: "flex", gap: 1.5, mt: 0.5 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
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
                      formatter={(val) => (
                        <span style={{ color: theme.palette.text.secondary, fontSize: "0.8rem", fontWeight: 600 }}>
                          {val}
                        </span>
                      )}
                    />
                    <Area
                      type="monotone"
                      name={`${selectedYear} Revenue`}
                      dataKey="thisYear"
                      stroke="#7c4dff"
                      strokeWidth={2.8}
                      fill="url(#detailThisYear)"
                      activeDot={{ r: 6, fill: "#7c4dff", stroke: "#fff", strokeWidth: 2 }}
                    />
                    <Area
                      type="monotone"
                      name={`${selectedYear - 1} Revenue`}
                      dataKey="lastYear"
                      stroke="#00bfa6"
                      strokeWidth={2.2}
                      strokeDasharray="4 4"
                      fill="url(#detailLastYear)"
                      activeDot={{ r: 5, fill: "#00bfa6", stroke: "#fff", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue by Tier / Breakdown */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ p: 2.8, flex: 1, display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" fontWeight={800}>
                Revenue By Stream
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Contribution across SaaS subscription tiers
              </Typography>

              <Box sx={{ width: "100%", height: 210, mt: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueStreamsData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                    >
                      {revenueStreamsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(val) => [`₹${(val / 1000).toFixed(0)}k`, "Revenue"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              <Stack spacing={1.2} sx={{ mt: "auto" }}>
                {revenueStreamsData.map((item) => (
                  <Box key={item.name} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: item.color }} />
                      <Typography variant="body2" fontWeight={650}>
                        {item.name}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={800}>
                      ₹{(item.value / 1000).toFixed(0)}k
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Calculated Strategic Insights Section */}
      <Card sx={{ bgcolor: isDark ? "rgba(124, 77, 255, 0.05)" : "rgba(124, 77, 255, 0.03)", border: "1px dashed rgba(124,77,255,0.3)" }}>
        <CardContent sx={{ p: 2.8 }}>
          <Typography variant="subtitle1" fontWeight={800} color="primary.main" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <StarRounded fontSize="small" /> Key Business Insights ({selectedYear})
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" fontWeight={750}>
                Strong Acceleration in Q4
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Revenue grew by +{metrics.growth}% compared to the prior fiscal year, driven heavily by enterprise tier adoption and renewals in {metrics.bestPeriod}.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" fontWeight={750}>
                Enterprise Stability
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Enterprise plans comprise over 55% of recurring cashflows, providing reliable runway and high gross margin retention.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" fontWeight={750}>
                Projected Next Quarter
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Based on continuous month-over-month trajectory, next cycle is anticipated to clear ₹11.20L in total billings.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Associated Transactions Table with Filter */}
      <Card>
        <CardContent sx={{ p: 2.8 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1.5 }}>
            <Box>
              <Typography variant="h6" fontWeight={800}>
                Revenue Transactions Ledger
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Verified customer settlement entries
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <FilterListRounded sx={{ color: "text.secondary", fontSize: 20 }} />
              <Select
                size="small"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ borderRadius: 2, fontSize: "0.82rem", minWidth: 120 }}
              >
                <MenuItem value="All">All Statuses</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Failed">Failed</MenuItem>
              </Select>
            </Stack>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Plan / Tier</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Method</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Timestamp</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions.map((tx) => (
                  <TableRow key={tx.id} hover>
                    <TableCell sx={{ fontWeight: 700, color: "primary.main" }}>{tx.id}</TableCell>
                    <TableCell sx={{ fontWeight: 750 }}>{tx.name}</TableCell>
                    <TableCell>{tx.plan}</TableCell>
                    <TableCell sx={{ fontWeight: 850 }}>{tx.amount}</TableCell>
                    <TableCell>{tx.method}</TableCell>
                    <TableCell sx={{ color: "text.secondary", fontSize: "0.82rem" }}>{tx.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={tx.status}
                        size="small"
                        color={tx.status === "Completed" ? "success" : tx.status === "Failed" ? "error" : "warning"}
                        sx={{ fontWeight: 700 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Stack>
  );
}
