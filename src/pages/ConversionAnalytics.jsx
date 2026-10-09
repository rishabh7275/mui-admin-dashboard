import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowBackRounded,
  TrendingUpRounded,
  FilterListRounded,
  FileDownloadRounded,
  CheckCircleOutlineRounded,
  PeopleAltRounded,
  ShoppingBagRounded,
  PercentRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
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
  LinearProgress,
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
} from "recharts";
import { conversionMonthlyData } from "../data/mockData";

export default function ConversionAnalytics({ onNotice }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === "dark";

  const [quarterFilter, setQuarterFilter] = useState("All");

  const filteredData = React.useMemo(() => {
    if (quarterFilter === "Q1") return conversionMonthlyData.slice(0, 3);
    if (quarterFilter === "Q2") return conversionMonthlyData.slice(3, 6);
    if (quarterFilter === "Q3") return conversionMonthlyData.slice(6, 9);
    if (quarterFilter === "Q4") return conversionMonthlyData.slice(9, 12);
    return conversionMonthlyData;
  }, [quarterFilter]);

  const funnelSteps = [
    { stage: "Website Visitors", count: "782,000", conv: "100%", drop: "0%", color: "#7c4dff" },
    { stage: "Lead Sign-ups", count: "178,200", conv: "22.8%", drop: "-77.2%", color: "#9e77ff" },
    { stage: "Product Trials", count: "89,100", conv: "11.4%", drop: "-50.0%", color: "#00bfa6" },
    { stage: "Paid Subscriptions", count: "39,400", conv: "18.6%", drop: "-55.8%", color: "#38bdf8" },
  ];

  const exportCSV = () => {
    const headers = ["Month", "Visitors", "Leads", "Customers", "Conversion Rate (%)"];
    const rows = filteredData.map((d) => [d.month, d.visitors, d.leads, d.customers, d.rate]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `conversion_analytics_${quarterFilter.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onNotice(`Downloaded Conversion Analytics (${quarterFilter})`);
  };

  return (
    <Stack spacing={3}>
      {/* Top Header */}
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
              Conversion Rate Analytics
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Funnel efficiency, trial activations, and visitor-to-paid subscriber velocity.
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Select
            size="small"
            value={quarterFilter}
            onChange={(e) => setQuarterFilter(e.target.value)}
            sx={{ borderRadius: 2, minWidth: 110, fontWeight: 750 }}
          >
            <MenuItem value="All">All 2026</MenuItem>
            <MenuItem value="Q1">Q1 (Jan-Mar)</MenuItem>
            <MenuItem value="Q2">Q2 (Apr-Jun)</MenuItem>
            <MenuItem value="Q3">Q3 (Jul-Sep)</MenuItem>
            <MenuItem value="Q4">Q4 (Oct-Dec)</MenuItem>
          </Select>

          <Button
            variant="outlined"
            size="small"
            startIcon={<FileDownloadRounded />}
            onClick={exportCSV}
            sx={{ borderRadius: 2 }}
          >
            Export CSV
          </Button>
        </Stack>
      </Box>

      {/* Summary KPI Cards */}
      <Grid container spacing={2.2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={750}>
                OVERALL CONVERSION RATE
              </Typography>
              <Typography variant="h5" fontWeight={900} sx={{ mt: 1, color: "primary.main" }}>
                18.6%
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 1 }}>
                <Chip label="+4.8% vs benchmark" size="small" color="success" variant="outlined" sx={{ fontWeight: 700 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={750}>
                TRIAL-TO-PAID CONVERSION
              </Typography>
              <Typography variant="h5" fontWeight={900} sx={{ mt: 1, color: "secondary.main" }}>
                44.2%
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                +6.1% from self-serve onboarding
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={750}>
                AVG CUSTOMER ACQ COST (CAC)
              </Typography>
              <Typography variant="h5" fontWeight={900} sx={{ mt: 1 }}>
                ₹3,420
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                Payback period: 1.4 months
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={750}>
                CHURN RATE
              </Typography>
              <Typography variant="h5" fontWeight={900} sx={{ mt: 1, color: "#38bdf8" }}>
                1.8%
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                Industry top decile
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Conversion Rate Trend Chart & Funnel Breakdown */}
      <Grid container spacing={2.2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ p: 2.8, flex: 1, display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight={800}>
                    Conversion Rate Trendline (%)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Percentage of visitors converted into paying customers
                  </Typography>
                </Box>
                <Chip label={quarterFilter} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
              </Box>

              <Box sx={{ width: "100%", height: 320, mt: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={filteredData} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7c4dff" stopOpacity={0.45} />
                        <stop offset="90%" stopColor="#7c4dff" stopOpacity={0.01} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      stroke={theme.palette.text.secondary}
                      tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke={theme.palette.text.secondary}
                      tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                      tickFormatter={(val) => `${val}%`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <RechartsTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload;
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
                                {label} 2026
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 800, color: "primary.main", mt: 0.5 }}>
                                Conversion Rate: {item.rate}%
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                                Visitors: {item.visitors.toLocaleString()} | Customers: {item.customers.toLocaleString()}
                              </Typography>
                            </Box>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      name="Conversion Rate"
                      dataKey="rate"
                      stroke="#7c4dff"
                      strokeWidth={3}
                      fill="url(#convGrad)"
                      activeDot={{ r: 6, fill: "#7c4dff", stroke: "#ffffff", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Funnel Dropoff Stages */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ p: 2.8, flex: 1, display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" fontWeight={800}>
                Sales Pipeline Funnel
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Step-by-step conversion dropoffs
              </Typography>

              <Stack spacing={2.5} sx={{ mt: 3, flex: 1, justifyContent: "space-around" }}>
                {funnelSteps.map((s, i) => (
                  <Box key={s.stage}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.6 }}>
                      <Typography variant="body2" fontWeight={750}>
                        {s.stage}
                      </Typography>
                      <Typography variant="body2" fontWeight={800} sx={{ color: s.color }}>
                        {s.count}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={parseFloat(s.conv)}
                      sx={{
                        height: 8,
                        borderRadius: 10,
                        bgcolor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 10,
                          bgcolor: s.color,
                        },
                      }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.4 }}>
                      <Typography variant="caption" color="text.secondary">
                        Efficiency: {s.conv}
                      </Typography>
                      <Typography variant="caption" color="error.light">
                        {s.drop}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Monthly Metrics Table */}
      <Card>
        <CardContent sx={{ p: 2.8 }}>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
            Monthly Conversion Audit
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800 }}>Period</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Site Visitors</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Acquired Leads</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Paid Customers</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Conversion Rate</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Health</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.month} hover>
                    <TableCell sx={{ fontWeight: 750 }}>{row.month} 2026</TableCell>
                    <TableCell>{row.visitors.toLocaleString()}</TableCell>
                    <TableCell>{row.leads.toLocaleString()}</TableCell>
                    <TableCell sx={{ fontWeight: 750 }}>{row.customers.toLocaleString()}</TableCell>
                    <TableCell sx={{ fontWeight: 850, color: "primary.main" }}>{row.rate}%</TableCell>
                    <TableCell>
                      <Chip
                        label={row.rate >= 18 ? "Optimal" : "Standard"}
                        color={row.rate >= 18 ? "success" : "default"}
                        size="small"
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
