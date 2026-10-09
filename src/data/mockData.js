// Centralized verified mock data store for SaaS Admin Analytics

export const revenueMonthlyData = {
  2026: [
    { period: "Jan", thisYear: 42000, lastYear: 31000, transactions: 142, margin: 72 },
    { period: "Feb", thisYear: 58000, lastYear: 41000, transactions: 184, margin: 74 },
    { period: "Mar", thisYear: 51000, lastYear: 38000, transactions: 165, margin: 71 },
    { period: "Apr", thisYear: 79000, lastYear: 56000, transactions: 245, margin: 76 },
    { period: "May", thisYear: 67000, lastYear: 49000, transactions: 210, margin: 75 },
    { period: "Jun", thisYear: 94000, lastYear: 68000, transactions: 298, margin: 78 },
    { period: "Jul", thisYear: 76000, lastYear: 62000, transactions: 238, margin: 74 },
    { period: "Aug", thisYear: 89000, lastYear: 71000, transactions: 275, margin: 77 },
    { period: "Sep", thisYear: 82000, lastYear: 67000, transactions: 254, margin: 76 },
    { period: "Oct", thisYear: 98000, lastYear: 78000, transactions: 310, margin: 79 },
    { period: "Nov", thisYear: 88000, lastYear: 74000, transactions: 272, margin: 77 },
    { period: "Dec", thisYear: 105000, lastYear: 85000, transactions: 340, margin: 81 },
  ],
  2025: [
    { period: "Jan", thisYear: 31000, lastYear: 24000, transactions: 110, margin: 68 },
    { period: "Feb", thisYear: 41000, lastYear: 29000, transactions: 135, margin: 70 },
    { period: "Mar", thisYear: 38000, lastYear: 32000, transactions: 125, margin: 69 },
    { period: "Apr", thisYear: 56000, lastYear: 41000, transactions: 178, margin: 72 },
    { period: "May", thisYear: 49000, lastYear: 39000, transactions: 155, margin: 71 },
    { period: "Jun", thisYear: 68000, lastYear: 52000, transactions: 215, margin: 73 },
    { period: "Jul", thisYear: 62000, lastYear: 48000, transactions: 195, margin: 72 },
    { period: "Aug", thisYear: 71000, lastYear: 55000, transactions: 220, margin: 74 },
    { period: "Sep", thisYear: 67000, lastYear: 53000, transactions: 205, margin: 73 },
    { period: "Oct", thisYear: 78000, lastYear: 60000, transactions: 240, margin: 75 },
    { period: "Nov", thisYear: 74000, lastYear: 59000, transactions: 230, margin: 74 },
    { period: "Dec", thisYear: 85000, lastYear: 69000, transactions: 265, margin: 76 },
  ],
};

export const revenueQuarterlyData = {
  2026: [
    { period: "Q1", thisYear: 151000, lastYear: 110000, transactions: 491, margin: 72.3 },
    { period: "Q2", thisYear: 240000, lastYear: 173000, transactions: 753, margin: 76.3 },
    { period: "Q3", thisYear: 247000, lastYear: 200000, transactions: 767, margin: 75.6 },
    { period: "Q4", thisYear: 291000, lastYear: 237000, transactions: 922, margin: 79.0 },
  ],
  2025: [
    { period: "Q1", thisYear: 110000, lastYear: 85000, transactions: 370, margin: 69.0 },
    { period: "Q2", thisYear: 173000, lastYear: 132000, transactions: 548, margin: 72.0 },
    { period: "Q3", thisYear: 200000, lastYear: 156000, transactions: 620, margin: 73.0 },
    { period: "Q4", thisYear: 237000, lastYear: 188000, transactions: 735, margin: 75.0 },
  ],
};

export const revenueStreamsData = [
  { name: "Enterprise Plans", value: 485000, color: "#7c4dff" },
  { name: "Pro Workspaces", value: 242000, color: "#00bfa6" },
  { name: "Starter Tier", value: 102000, color: "#38bdf8" },
  { name: "Add-ons & APIs", value: 45000, color: "#f59e0b" },
];

export const conversionMonthlyData = [
  { month: "Jan", visitors: 48000, leads: 9200, customers: 1820, rate: 16.4 },
  { month: "Feb", visitors: 54000, leads: 11000, customers: 2150, rate: 17.1 },
  { month: "Mar", visitors: 51000, leads: 10400, customers: 2080, rate: 16.8 },
  { month: "Apr", visitors: 62000, leads: 13800, customers: 2940, rate: 18.2 },
  { month: "May", visitors: 59000, leads: 12900, customers: 2680, rate: 17.6 },
  { month: "Jun", visitors: 71000, leads: 16200, customers: 3620, rate: 19.4 },
  { month: "Jul", visitors: 66000, leads: 14700, customers: 3180, rate: 18.5 },
  { month: "Aug", visitors: 74000, leads: 17100, customers: 3890, rate: 19.8 },
  { month: "Sep", visitors: 70000, leads: 15800, customers: 3510, rate: 18.9 },
  { month: "Oct", visitors: 82000, leads: 19400, customers: 4580, rate: 20.6 },
  { month: "Nov", visitors: 76000, leads: 17800, customers: 4020, rate: 19.5 },
  { month: "Dec", visitors: 88000, leads: 21500, customers: 5120, rate: 21.2 },
];

export const recentTransactionsList = [
  { id: "TXN-9042", name: "Rahul Sharma", plan: "Enterprise Plan", amount: "₹24,500", rawAmount: 24500, method: "UPI", status: "Completed", date: "Today, 02:45 PM" },
  { id: "TXN-9041", name: "Priya Singh", plan: "Pro Plan", amount: "₹12,900", rawAmount: 12900, method: "Card", status: "Completed", date: "Today, 11:20 AM" },
  { id: "TXN-9040", name: "Aman Verma", plan: "Starter Plan", amount: "₹5,400", rawAmount: 5400, method: "Net Banking", status: "Pending", date: "Yesterday, 05:15 PM" },
  { id: "TXN-9039", name: "Neha Gupta", plan: "Enterprise Plan", amount: "₹31,200", rawAmount: 31200, method: "Card", status: "Completed", date: "Yesterday, 01:10 PM" },
  { id: "TXN-9038", name: "Arjun Patel", plan: "Pro Plan", amount: "₹8,750", rawAmount: 8750, method: "UPI", status: "Failed", date: "02 Oct, 09:30 AM" },
  { id: "TXN-9037", name: "Kavya Joshi", plan: "Enterprise Plan", amount: "₹28,000", rawAmount: 28000, method: "Net Banking", status: "Completed", date: "01 Oct, 04:15 PM" },
];

export const goalProgressMetrics = [
  {
    label: "Revenue target",
    value: 82,
    current: "₹8.45L",
    target: "₹10.30L",
    description: "Annual recurring revenue progress toward Q4 milestone.",
    color: "#7c4dff",
  },
  {
    label: "New customers",
    value: 68,
    current: "816 accounts",
    target: "1,200 accounts",
    description: "Paid SaaS subscriptions acquired in current cycle.",
    color: "#00bfa6",
  },
  {
    label: "Orders target",
    value: 76,
    current: "2,845 orders",
    target: "3,750 orders",
    description: "Successful plan checkouts & renewals logged this month.",
    color: "#9e77ff",
  },
  {
    label: "Retention rate",
    value: 91,
    current: "91%",
    target: "90% benchmark",
    description: "Percentage of active subscriptions retained month-over-month.",
    color: "#38bdf8",
  },
];
