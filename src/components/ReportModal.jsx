import React, { useState } from "react";
import {
  CloseRounded,
  FileDownloadRounded,
  PrintRounded,
  CheckCircleRounded,
  TrendingUpRounded,
  AttachMoneyRounded,
  PeopleAltRounded,
  ShoppingBagRounded,
  AssessmentRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
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
  revenueMonthlyData,
  conversionMonthlyData,
  recentTransactionsList,
} from "../data/mockData";

export default function ReportModal({ open, onClose, onNotice }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [dateRange, setDateRange] = useState("FY2026");
  const [sections, setSections] = useState({
    revenue: true,
    users: true,
    orders: true,
    transactions: true,
  });
  const [generating, setGenerating] = useState(false);
  const [generatedDate, setGeneratedDate] = useState(new Date().toLocaleDateString("en-IN", { dateStyle: "medium" }));

  const handleToggle = (key) => {
    setSections((prev) => ({ ...prev, [key]: !prev [key] }));
  };

  // CSV Generator with active selections
  const handleDownloadCSV = () => {
    setGenerating(true);
    setTimeout(() => {
      let csvRows = [];
      csvRows.push(["SAAS EXECUTIVE PERFORMANCE REPORT"]);
      csvRows.push([`Generated On: ${generatedDate}`, `Period: ${dateRange}`]);
      csvRows.push([]);

      if (sections.revenue) {
        csvRows.push(["--- REVENUE TRENDS (2026) ---"]);
        csvRows.push(["Period", "This Year Revenue (INR)", "Last Year Benchmark", "Transactions"]);
        revenueMonthlyData[2026].forEach((r) => {
          csvRows.push([r.period, r.thisYear, r.lastYear, r.transactions]);
        });
        csvRows.push([]);
      }

      if (sections.users) {
        csvRows.push(["--- USER & CONVERSION ACTIVITY ---"]);
        csvRows.push(["Month", "Visitors", "Leads", "Customers", "Conversion Rate %"]);
        conversionMonthlyData.forEach((c) => {
          csvRows.push([c.month, c.visitors, c.leads, c.customers, c.rate]);
        });
        csvRows.push([]);
      }

      if (sections.transactions) {
        csvRows.push(["--- RECENT AUDITED TRANSACTIONS ---"]);
        csvRows.push(["Transaction ID", "Customer", "Plan", "Amount", "Status"]);
        recentTransactionsList.forEach((t) => {
          csvRows.push([t.id, t.name, t.plan, t.amount, t.status]);
        });
        csvRows.push([]);
      }

      const csvContent = "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Executive_Report_${dateRange}_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setGenerating(false);
      onNotice("Report exported successfully as CSV");
    }, 600);
  };

  // Printable view trigger
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3.5,
            bgcolor: isDark ? "#0f172a" : "#ffffff",
            backgroundImage: "none",
            border: `1px solid ${isDark ? "rgba(124, 77, 255, 0.25)" : "rgba(15, 23, 42, 0.1)"}`,
            boxShadow: isDark ? "0 25px 60px rgba(0,0,0,0.6)" : "0 25px 60px rgba(15,23,42,0.15)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2.8,
          pb: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <AssessmentRounded sx={{ color: "primary.main", fontSize: 28 }} />
          <Box>
            <Typography variant="h6" fontWeight={850}>
              Generate Executive Analytics Report
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Review parameters, inspect real-time preview, and export CSV/Print.
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseRounded />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 3 }}>
        {/* Controls Bar: Date Period and Section Selectors */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 5 }}>
            <Typography variant="caption" fontWeight={750} color="text.secondary" sx={{ display: "block", mb: 0.8 }}>
              REPORTING PERIOD
            </Typography>
            <Select
              fullWidth
              size="small"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              sx={{ borderRadius: 2, fontWeight: 700 }}
            >
              <MenuItem value="FY2026">Full Fiscal Year 2026</MenuItem>
              <MenuItem value="Q4-2026">Q4 2026 (Oct - Dec)</MenuItem>
              <MenuItem value="Q3-2026">Q3 2026 (Jul - Sep)</MenuItem>
              <MenuItem value="H2-2026">Second Half (Jul - Dec 2026)</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 12, sm: 7 }}>
            <Typography variant="caption" fontWeight={750} color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
              INCLUDED SECTIONS
            </Typography>
            <FormGroup row sx={{ gap: 1 }}>
              <FormControlLabel
                control={<Checkbox size="small" checked={sections.revenue} onChange={() => handleToggle("revenue")} />}
                label={<Typography variant="body2" fontWeight={650}>Revenue</Typography>}
              />
              <FormControlLabel
                control={<Checkbox size="small" checked={sections.users} onChange={() => handleToggle("users")} />}
                label={<Typography variant="body2" fontWeight={650}>Users</Typography>}
              />
              <FormControlLabel
                control={<Checkbox size="small" checked={sections.orders} onChange={() => handleToggle("orders")} />}
                label={<Typography variant="body2" fontWeight={650}>Orders</Typography>}
              />
              <FormControlLabel
                control={<Checkbox size="small" checked={sections.transactions} onChange={() => handleToggle("transactions")} />}
                label={<Typography variant="body2" fontWeight={650}>Transactions</Typography>}
              />
            </FormGroup>
          </Grid>
        </Grid>

        {/* Live Document Preview Container */}
        <Box
          id="printable-report"
          sx={{
            p: 3,
            borderRadius: 2.5,
            bgcolor: isDark ? "rgba(8, 13, 26, 0.6)" : "rgba(248, 250, 252, 0.8)",
            border: `1px solid ${isDark ? "rgba(148, 163, 184, 0.12)" : "rgba(15, 23, 42, 0.08)"}`,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 2 }}>
            <Box>
              <Typography variant="subtitle1" fontWeight={900} color="primary.main">
                Rishabh Admin — Executive Performance Report
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Period: {dateRange} • Generated: {generatedDate}
              </Typography>
            </Box>
            <Chip label="Audited Demo Snapshot" size="small" variant="outlined" sx={{ fontWeight: 700 }} />
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* KPI Snapshot */}
          <Grid container spacing={2} sx={{ mb: 2.5 }}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Total Revenue</Typography>
              <Typography variant="subtitle1" fontWeight={850}>₹8,45,000</Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Active Users</Typography>
              <Typography variant="subtitle1" fontWeight={850}>12,458</Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Orders Completed</Typography>
              <Typography variant="subtitle1" fontWeight={850}>2,845</Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Avg Conversion</Typography>
              <Typography variant="subtitle1" fontWeight={850}>18.6%</Typography>
            </Grid>
          </Grid>

          {/* Revenue Section Preview */}
          {sections.revenue && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>
                Revenue Performance Breakdown
              </Typography>
              <TableContainer sx={{ border: "1px solid rgba(124,77,255,0.15)", borderRadius: 1.5 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 750 }}>Period</TableCell>
                      <TableCell sx={{ fontWeight: 750 }}>This Year</TableCell>
                      <TableCell sx={{ fontWeight: 750 }}>Benchmark</TableCell>
                      <TableCell sx={{ fontWeight: 750 }}>Transactions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {revenueMonthlyData[2026].slice(0, 4).map((r) => (
                      <TableRow key={r.period}>
                        <TableCell>{r.period} 2026</TableCell>
                        <TableCell sx={{ fontWeight: 750 }}>₹{r.thisYear.toLocaleString()}</TableCell>
                        <TableCell sx={{ color: "text.secondary" }}>₹{r.lastYear.toLocaleString()}</TableCell>
                        <TableCell>{r.transactions}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Transactions Section Preview */}
          {sections.transactions && (
            <Box sx={{ mt: 2.5 }}>
              <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>
                Recent Settled Transactions
              </Typography>
              <TableContainer sx={{ border: "1px solid rgba(124,77,255,0.15)", borderRadius: 1.5 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 750 }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 750 }}>Client</TableCell>
                      <TableCell sx={{ fontWeight: 750 }}>Plan</TableCell>
                      <TableCell sx={{ fontWeight: 750 }}>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentTransactionsList.slice(0, 3).map((t) => (
                      <TableRow key={t.id}>
                        <TableCell sx={{ color: "primary.main", fontWeight: 700 }}>{t.id}</TableCell>
                        <TableCell>{t.name}</TableCell>
                        <TableCell>{t.plan}</TableCell>
                        <TableCell sx={{ fontWeight: 800 }}>{t.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2.5, px: 3, justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          startIcon={<PrintRounded />}
          onClick={handlePrint}
          sx={{ borderRadius: 2 }}
        >
          Print / PDF
        </Button>

        <Stack direction="row" spacing={1.5}>
          <Button onClick={onClose} sx={{ borderRadius: 2 }}>
            Close
          </Button>
          <Button
            variant="contained"
            startIcon={generating ? <CircularProgress size={18} color="inherit" /> : <FileDownloadRounded />}
            onClick={handleDownloadCSV}
            disabled={generating}
            sx={{ borderRadius: 2, px: 2.5 }}
          >
            {generating ? "Exporting..." : "Download CSV"}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
