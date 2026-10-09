import React, { useState, useMemo } from "react";
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
} from "@mui/material";
import { FileDownloadRounded, FilterListRounded } from "@mui/icons-material";

const initialOrders = [
  { id: "#ORD-1048", customer: "Rahul Sharma", plan: "Enterprise Plan", amount: "₹24,500", date: "Today, 02:45 PM", status: "Delivered" },
  { id: "#ORD-1047", customer: "Priya Singh", plan: "Pro Plan", amount: "₹12,900", date: "Today, 11:20 AM", status: "Processing" },
  { id: "#ORD-1046", customer: "Aman Verma", plan: "Starter Plan", amount: "₹5,400", date: "Yesterday, 05:15 PM", status: "Pending" },
  { id: "#ORD-1045", customer: "Neha Gupta", plan: "Enterprise Plan", amount: "₹31,200", date: "Yesterday, 01:10 PM", status: "Delivered" },
  { id: "#ORD-1044", customer: "Arjun Patel", plan: "Pro Plan", amount: "₹8,750", date: "02 Oct, 09:30 AM", status: "Cancelled" },
  { id: "#ORD-1043", customer: "Kavya Joshi", plan: "Enterprise Plan", amount: "₹28,000", date: "01 Oct, 04:15 PM", status: "Delivered" },
];

export default function Orders() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = useMemo(() => {
    if (statusFilter === "All") return initialOrders;
    return initialOrders.filter((o) => o.status === statusFilter);
  }, [statusFilter]);

  const exportCSV = () => {
    const headers = ["Order ID", "Customer", "Plan", "Amount", "Date", "Status"];
    const rows = filteredOrders.map((o) => [o.id, o.customer, o.plan, o.amount, o.date, o.status]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_${statusFilter.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Stack spacing={3}>
      {/* Header and Filter */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4">Order Management</Typography>
          <Typography color="text.secondary">
            Track customer subscriptions, licenses and fulfillment orders.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ minWidth: 130, borderRadius: 2, fontWeight: 700 }}
          >
            <MenuItem value="All">All Statuses</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>

          <Button variant="outlined" startIcon={<FileDownloadRounded />} onClick={exportCSV} sx={{ borderRadius: 2 }}>
            Export CSV
          </Button>
        </Stack>
      </Box>

      {/* KPI Overview */}
      <Grid container spacing={2.2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ p: 2.2 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={750}>TOTAL FULFILLED</Typography>
              <Typography variant="h5" fontWeight={900} sx={{ mt: 0.5 }}>2,845</Typography>
              <Typography variant="caption" color="success.main" fontWeight={700}>+15.4% this month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ p: 2.2 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={750}>PROCESSING</Typography>
              <Typography variant="h5" fontWeight={900} sx={{ mt: 0.5, color: "secondary.main" }}>48</Typography>
              <Typography variant="caption" color="text.secondary">Within 2h SLA</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ p: 2.2 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={750}>PENDING PAYMENT</Typography>
              <Typography variant="h5" fontWeight={900} sx={{ mt: 0.5, color: "warning.main" }}>12</Typography>
              <Typography variant="caption" color="text.secondary">Awaiting gateway auth</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ p: 2.2 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={750}>FULFILLMENT RATE</Typography>
              <Typography variant="h5" fontWeight={900} sx={{ mt: 0.5 }}>98.2%</Typography>
              <Typography variant="caption" color="text.secondary">Target: 97.0%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Orders Table */}
      <Card>
        <CardContent sx={{ p: 2.8 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800 }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Plan Item</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Timestamp</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((o) => (
                  <TableRow hover key={o.id}>
                    <TableCell sx={{ fontWeight: 700, color: "primary.main" }}>{o.id}</TableCell>
                    <TableCell sx={{ fontWeight: 750 }}>{o.customer}</TableCell>
                    <TableCell>{o.plan}</TableCell>
                    <TableCell sx={{ fontWeight: 850 }}>{o.amount}</TableCell>
                    <TableCell sx={{ color: "text.secondary", fontSize: "0.82rem" }}>{o.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={o.status}
                        size="small"
                        color={o.status === "Delivered" ? "success" : o.status === "Cancelled" ? "error" : "warning"}
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